import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"
import client, {
  setAccessToken,
  setUnauthenticatedHandler,
  refreshAccessToken,
  isAuthError,
  isTokenExpired,
} from "@/api/client"
import { LoginRequestDTO } from "@/api/sdk"
import UserWithAccount from "@/types/user.types"

export type AuthContextType = {
  user: UserWithAccount | null
  login: (data: LoginRequestDTO) => Promise<void>
  logout: () => Promise<void>
  refetchUser: () => Promise<void>
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USER_STORAGE_KEY = 'user_data';
const TOKEN_STORAGE_KEY = 'accessToken';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserWithAccount | null>(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  })

  const [loading, setLoading] = useState(true)

  // Espelho do user para handlers registrados uma única vez (evento de storage)
  const userRef = useRef(user)
  useEffect(() => {
    userRef.current = user
  }, [user])

  const fetchUserWithAccount = useCallback(async () => {
    const response = await client.user.userControllerGetMe()
    const userData = response.data as UserWithAccount;

    setUser(userData)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  }, [])

  const logout = useCallback(async () => {
    try {
      await client.login.loginControllerLogout()
    } catch (err) {
      console.error("Erro no logout backend:", err)
    } finally {
      setAccessToken("")
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      localStorage.removeItem(USER_STORAGE_KEY)
      setUser(null)
    }
  }, [])

  const syncUser = useCallback(async () => {
    try {
      await fetchUserWithAccount()
    } catch (error) {
      if (isAuthError(error)) {
        await logout()
      } else {
        // Erro de rede/5xx: mantém o usuário do cache
        console.error("Falha ao sincronizar usuário:", error)
      }
    }
  }, [fetchUserWithAccount, logout])

  useEffect(() => {
    setUnauthenticatedHandler(() => {
      logout()
    })

    const initAuth = async () => {
      const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

      if (!storedToken) {
        setUser(null);
        localStorage.removeItem(USER_STORAGE_KEY);
        setLoading(false)
        return
      }

      setAccessToken(storedToken)

      if (isTokenExpired(storedToken)) {
        try {
          // Renova ANTES do router montar, evitando a rajada de 401 das
          // queries das rotas protegidas
          await refreshAccessToken()
        } catch (error) {
          if (isAuthError(error)) {
            // refreshAccessToken já limpou a sessão e disparou o logout
            setLoading(false)
            return
          }
          // Erro de rede/5xx: segue com o usuário do cache; o interceptor
          // tenta renovar de novo na próxima requisição
          console.error("Erro ao renovar sessão:", error)
        }
      }

      if (user) {
        // Perfil em cache: libera a UI e sincroniza em background
        setLoading(false)
        void syncUser()
      } else {
        await syncUser()
        setLoading(false)
      }
    }

    initAuth()

    const onStorage = (event: StorageEvent) => {
      if (event.key !== TOKEN_STORAGE_KEY) return
      if (event.newValue) {
        // Outra aba renovou o token ou logou: adota o token dela
        setAccessToken(event.newValue)
        // Aba estava deslogada e outra aba logou: hidrata o usuário
        if (!userRef.current) {
          void syncUser()
        }
      } else {
        // Outra aba deslogou: limpa só o estado local
        setAccessToken("")
        localStorage.removeItem(USER_STORAGE_KEY)
        setUser(null)
      }
    }
    window.addEventListener("storage", onStorage)

    return () => {
      setUnauthenticatedHandler(() => {})
      window.removeEventListener("storage", onStorage)
    }
    // Bootstrap de sessão: deve rodar uma única vez no mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function login(credentials: LoginRequestDTO) {
    try {
      const response = await client.login.loginControllerLogin(credentials)
      const accessToken = response.data.accessToken

      localStorage.setItem(TOKEN_STORAGE_KEY, accessToken)
      setAccessToken(accessToken)

      await fetchUserWithAccount()
    } catch (error) {
      // Não deixa token órfão se a busca do usuário falhar após o login
      setAccessToken("")
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      console.error("Erro no login:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        refetchUser: fetchUserWithAccount,
        loading,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  return ctx
}
