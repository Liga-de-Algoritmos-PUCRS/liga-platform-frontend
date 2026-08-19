import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useAuth, AuthProvider } from './providers/AuthProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { router } from './router'
import './index.css'

const queryClient = new QueryClient()

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
        {/* Montado fora do RouterProvider/loading gate: um toast disparado
            durante o initAuth() (antes do router montar) precisa de um
            Toaster já inscrito para não ser descartado (sonner não repassa
            toasts publicados antes da inscrição a quem assina depois). */}
        <Toaster
          richColors
          position="bottom-right"
          toastOptions={{
            style: {
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-sans)',
            },
            classNames: {
              toast: 'border border-border/20 shadow-xl',
              title: 'font-semibold text-[15px] tracking-tight',
              description: 'text-sm opacity-90',
            }
          }}
        />
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