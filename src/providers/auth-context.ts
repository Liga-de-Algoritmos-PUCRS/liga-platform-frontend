import { createContext } from "react";

type AuthContextType = {
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)