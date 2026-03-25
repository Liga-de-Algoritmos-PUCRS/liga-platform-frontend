import { createContext, useContext, useState, useEffect, useCallback } from "react"
import client, { setAccessToken, setUnauthenticatedHandler } from "@/api/client"
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
  
  const [loading, setLoading] = useState(!user)

  const fetchUserWithAccount = useCallback(async () => {
    try {
      const response = await client.user.userControllerGetMe()
      const userData = response.data as UserWithAccount;
      
      setUser(userData)
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      
    } catch (error) {
      console.error("Falha ao sincronizar usuário:", error)
    }
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

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
      
      if (storedToken) {
        setAccessToken(storedToken)
        
        if (!user) {
            try {
              await fetchUserWithAccount()
            } catch (error) {
               console.error("Erro ao validar sessão:", error)
               await logout() 
            }
        }
      } else {
        setUser(null);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
      
      setLoading(false)
    }

    initAuth()

    setUnauthenticatedHandler(() => {
      logout()
    })

    return () => {
      setUnauthenticatedHandler(() => {})
    }
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

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  return ctx
}