import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import { useAuth, AuthProvider } from './providers/AuthProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { routeTree } from './routeTree.gen'
import './index.css'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, 
  },
})

export function InnerApp() {
  const auth = useAuth()

  if (auth.loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background ">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return <RouterProvider router={router} context={{ auth }} />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme"> 
        <AuthProvider>
            <InnerApp />
        </AuthProvider>
      </ThemeProvider> 
    </QueryClientProvider>
  )
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
      <App />
  )
}