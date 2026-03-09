import axios from "axios"
import { Configuration, UserApi, FileApi, LoginApi, ResetPasswordApi, SignupApi, ProblemsApi, SubmitApi} from "./sdk"

const BASE_URL = import.meta.env.VITE_API || "http://localhost:3000"

let accessToken: string = ""

export function setAccessToken(token: string) {
  accessToken = token
}

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

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshRes = await rawAxios.post("/auth/refresh")
        
        const { accessToken: newAccess } = refreshRes.data

        setAccessToken(newAccess)

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`
        return axiosInstance(originalRequest)
      } catch (err) {
        setAccessToken("")
        return Promise.reject(err)
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

export class ApiClient {
  user = userApi
  file = fileApi
  login = loginApi
  resetPassword = resetPasswordApi
  signup = signupApi
  problem = problemApi
  submit = submitApi
}

const client = new ApiClient()
export default client