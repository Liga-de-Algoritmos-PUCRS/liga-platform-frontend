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

// Single-flight: requisições concorrentes que tomaram 401 compartilham o mesmo
// refresh — o backend rotaciona o token, então refreshes paralelos com o mesmo
// cookie derrubariam a sessão.
export function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = rawAxios
      .post("/auth/refresh")
      .then(res => {
        const { accessToken: newAccess } = res.data

        setAccessToken(newAccess)
        localStorage.setItem(TOKEN_STORAGE_KEY, newAccess)
        return newAccess as string
      })
      .catch(err => {
        // Só rejeição real do refresh token encerra a sessão; erro de
        // rede/5xx não desloga.
        if (isAuthError(err)) {
          clearSession()
        }
        throw err
      })
      .finally(() => {
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
