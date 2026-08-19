import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { Configuration, UserApi, FileApi, LoginApi, ResetPasswordApi, SignupApi, ProblemsApi, SubmitApi, ReportBugApi, RollCallApi} from "./sdk"

const BASE_URL = import.meta.env.VITE_API || "https://back.ligadealgoritmos.com"

const TOKEN_STORAGE_KEY = "accessToken"

let accessToken: string = localStorage.getItem(TOKEN_STORAGE_KEY) || ""

export function setAccessToken(token: string) {
  accessToken = token
}

let onUnauthenticated: (() => void) | null = null

export function setUnauthenticatedHandler(handler: () => void) {
  onUnauthenticated = handler
}

export function isAuthError(error: unknown): boolean {
  return (
    axios.isAxiosError(error) &&
    (error.response?.status === 401 || error.response?.status === 403)
  )
}

const EXP_MARGIN_SECONDS = 30

export function isTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<{ exp?: number }>(token)
    if (!exp) return false
    return exp <= Date.now() / 1000 + EXP_MARGIN_SECONDS
  } catch {
    return true
  }
}

const apiConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
}

const axiosInstance = axios.create(apiConfig)
export const api = axiosInstance;

export const rawAxios = axios.create(apiConfig)

function clearSession() {
  const hadToken = !!accessToken
  setAccessToken("")
  localStorage.removeItem(TOKEN_STORAGE_KEY)
  if (hadToken && onUnauthenticated) onUnauthenticated()
}

let refreshPromise: Promise<string> | null = null

const REFRESH_LOCK_NAME = "auth-refresh"
const REFRESH_TIMEOUT_MS = 10_000

function hasWebLocks(): boolean {
  return typeof navigator !== "undefined" && "locks" in navigator && !!navigator.locks
}

// Executa o refresh de verdade: chamada só depois de garantida a
// serialização (lock entre abas quando suportado, single-flight por aba
// sempre). `tokenBeforeRefresh` é o token com que o CHAMADOR entrou na fila —
// usado para detectar, tanto antes quanto depois da chamada de rede, se outra
// aba já renovou nesse meio-tempo.
async function performRefresh(tokenBeforeRefresh: string): Promise<string> {
  // Reler só agora (após adquirir o lock, se houver): se checasse antes de
  // entrar na fila, duas abas leriam o mesmo valor "antigo" e chamariam a
  // rede mesmo assim.
  const alreadyRenewed = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (alreadyRenewed && alreadyRenewed !== tokenBeforeRefresh) {
    setAccessToken(alreadyRenewed)
    return alreadyRenewed
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REFRESH_TIMEOUT_MS)

  try {
    const res = await rawAxios.post("/auth/refresh", undefined, { signal: controller.signal })
    const { accessToken: newAccess } = res.data

    setAccessToken(newAccess)
    localStorage.setItem(TOKEN_STORAGE_KEY, newAccess)
    return newAccess as string
  } catch (err) {
    // Só rejeição real do refresh token encerra a sessão; erro de
    // rede/5xx/timeout não desloga.
    if (isAuthError(err)) {
      const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

      // Outra aba renovou enquanto esta esperava a resposta. Como o backend
      // rotaciona o refresh token, o 401 aqui só significa que perdemos a
      // corrida — não que a sessão morreu. Adota o token da outra aba: sem
      // isso, o clearSession() apagaria do localStorage o token que ela
      // acabou de gravar e o evento `storage` derrubaria todas as abas.
      if (storedToken && storedToken !== tokenBeforeRefresh) {
        setAccessToken(storedToken)
        return storedToken
      }

      clearSession()
    }
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}

// Single-flight por aba: requisições concorrentes que tomaram 401 na mesma
// aba compartilham o mesmo refresh. Entre abas do mesmo navegador, o Web Lock
// em performRefresh garante que só uma efetivamente chama a rede; sem suporte
// a navigator.locks, cai de volta no single-flight por aba de sempre.
export function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    const tokenBeforeRefresh = accessToken

    // `LockGrantedCallback<T>` nos tipos do DOM não faz Awaited<T>: como o
    // callback retorna Promise<string>, o tipo inferido de request() vira
    // Promise<Promise<string>> — que a Promise nativa de fato achata em
    // runtime (resolver com um thenable segue o thenable). O cast corrige só
    // o tipo, não o comportamento.
    const attempt = hasWebLocks()
      ? (navigator.locks.request(
          REFRESH_LOCK_NAME,
          () => performRefresh(tokenBeforeRefresh)
        ) as unknown as Promise<string>)
      : performRefresh(tokenBeforeRefresh)

    refreshPromise = attempt.finally(() => {
      refreshPromise = null
    })
  }
  return refreshPromise
}

axiosInstance.interceptors.request.use(config => {
  if (accessToken) {
    config.headers = config.headers || {}
    ;(config.headers as Record<string, string>)["Authorization"] = `Bearer ${accessToken}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && originalRequest) {
      if (originalRequest._retry) {
        clearSession()
        return Promise.reject(error)
      }

      originalRequest._retry = true

      try {
        const newAccess = await refreshAccessToken()

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`
        return axiosInstance(originalRequest)
      } catch {
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

const config = new Configuration({ basePath: BASE_URL })

const loginApi = new LoginApi(config, undefined, rawAxios)
const resetPasswordApi = new ResetPasswordApi(config, undefined, axiosInstance)
const signupApi = new SignupApi(config, undefined, axiosInstance)
const fileApi = new FileApi(config, undefined, axiosInstance)
const userApi = new UserApi(config, undefined, axiosInstance)
const problemApi = new ProblemsApi(config, undefined, axiosInstance)
const submitApi = new SubmitApi(config, undefined, axiosInstance)
const reportBugApi = new ReportBugApi(config, undefined, axiosInstance)
const rollCallApi = new RollCallApi(config, undefined, axiosInstance)
export class ApiClient {
  user = userApi
  file = fileApi
  login = loginApi
  resetPassword = resetPasswordApi
  signup = signupApi
  problem = problemApi
  reportBug = reportBugApi
  submit = submitApi
  rollCall = rollCallApi
}

const client = new ApiClient()
export default client
