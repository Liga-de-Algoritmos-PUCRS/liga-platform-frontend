import axios from "axios"

let accessToken: string = ""

const baseURL = "http://localhost:3000/"

// setter usado pelo AuthProvider
export function setAccessToken(token: string) {
  accessToken = token;
}

// axios principal
const axiosInstance = axios.create({
  baseURL,
})

// axios sem interceptors → usado só para refresh
const rawAxios = axios.create({
  baseURL,
})

axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers || {};
    (config.headers as Record<string, string>)["Authorization"] =
      `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        setAccessToken("");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }

      try {
        // usa rawAxios → evita cair no mesmo interceptor
        const refreshRes = await rawAxios.post("/auth/refresh", {
          refreshToken,
        });
        const { accessToken: newAccess, refreshToken: newRefresh } =
          refreshRes.data;

        setAccessToken(newAccess);
        localStorage.setItem("refreshToken", newRefresh);

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        setAccessToken("");
        localStorage.removeItem("refreshToken");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

// const usersApi = new UsersApi(config, undefined, axiosInstance)

export class ApiClient {
  // users = usersApi
};

const client = new ApiClient();
export default client;