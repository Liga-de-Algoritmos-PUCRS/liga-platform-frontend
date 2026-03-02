import { AuthContext } from "./auth-context"

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  return (
    <AuthContext.Provider
    value={{
      loading: false
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}