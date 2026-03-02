import { RouterProvider } from "@tanstack/react-router"
import { AuthProvider } from "./providers/AuthProvider"
import { router } from "./routes/router"
import { useAuth } from "./hooks/use-auth"

function InnerApp() { 
  const { loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <RouterProvider
      router={router}
      context={{}}
    />
  )
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}

export default App
