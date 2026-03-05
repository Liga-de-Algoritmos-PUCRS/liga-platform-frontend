import { RouterProvider } from "@tanstack/react-router"
import { AuthProvider } from "./providers/AuthProvider"
import { router } from "./routes/router"
import { useAuth } from "./hooks/use-auth"
import { ColorProvider } from "./providers/ColorProvider"

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
    <ColorProvider>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </ColorProvider>
  )
}

export default App
