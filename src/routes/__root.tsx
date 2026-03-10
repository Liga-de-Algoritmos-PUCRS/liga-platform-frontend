import { createRootRouteWithContext, Outlet, useLocation } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { AuthContextType } from '@/providers/AuthProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { Navbar } from '@/components/navbar'

interface RouterContext {
  auth: AuthContextType
}

function RootComponent() {
  const location = useLocation();
  
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen w-full flex flex-col bg-background font-sans">
        
        {!hideNavbar && <Navbar />}        
        
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
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

      </div>
    </ThemeProvider>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})