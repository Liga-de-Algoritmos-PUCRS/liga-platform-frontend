import { Configuration, AccountApi, UserApi, FileApi, ResetPasswordApi, VerifyPhoneApi, SignupApi, AuthenticationApi } from "./sdk"
import axios, { InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API || "http://localhost:3000"

let accessToken: string = ""
let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: any) => void }> = [];

export function setAccessToken(token: string) {
  accessToken = token
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const apiConfig = {
  baseURL: BASE_URL,
  withCredentials: true, 
}

const axiosInstance = axios.create(apiConfig)
export const api = axiosInstance;

export const rawAxios = axios.create(apiConfig)

axiosInstance.interceptors.request.use(config => {
  if (accessToken) {
    config.headers = config.headers || {}
    ;(config.headers as Record<string, string>)["Authorization"] = `Bearer ${accessToken}`
  }
  return config
})

// Interface estendida para evitar erros do TypeScript na flag _retry
interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config as RetryConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        // Se já está a fazer refresh, coloca este pedido em espera na fila
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers["Authorization"] = 'Bearer ' + token;
          return axiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await rawAxios.post("/auth/refresh")
        const { accessToken: newAccess } = refreshRes.data

        setAccessToken(newAccess)
        
        // Sincronizar com o LocalStorage do AuthProvider
        localStorage.setItem('accessToken', newAccess);

        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newAccess;
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`
        
        processQueue(null, newAccess);
        
        return axiosInstance(originalRequest)
      } catch (err) {
        processQueue(err, null);
        setAccessToken("");
        
        // Limpar os dados do AuthProvider para forçar o logout visualmente
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user_data');
        
        // Opcional: Redirecionar para o login se o refresh falhar permanentemente
        window.location.href = '/login'; 
        
        return Promise.reject(err)
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error)
  }
)

const config = new Configuration({ basePath: BASE_URL })

const accountApi = new AccountApi(config, undefined, axiosInstance)
const resetPasswordApi = new ResetPasswordApi(config, undefined, axiosInstance)
const signupApi = new SignupApi(config, undefined, axiosInstance)
const verifyPhoneApi = new VerifyPhoneApi(config, undefined, axiosInstance)
const fileApi = new FileApi(config, undefined, axiosInstance)
const userApi = new UserApi(config, undefined, axiosInstance)
const authApi = new AuthenticationApi(config, undefined, axiosInstance)

export class ApiClient {
  account = accountApi
  user = userApi
  file = fileApi
  resetPassword = resetPasswordApi
  signup = signupApi
  verifyPhone = verifyPhoneApi
  login = authApi // Ajustado aqui para bater certo com a chamada client.login.loginControllerLogin do seu AuthProvider
  authenticationApi = authApi
}

const client = new ApiClient()
export default client