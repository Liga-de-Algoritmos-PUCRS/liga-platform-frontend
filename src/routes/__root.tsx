import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { AuthContextType } from '@/providers/AuthProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { Navbar } from '@/components/navbar'

interface RouterContext {
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen w-full flex flex-col bg-background">
        
        <Navbar />        
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
        
      </div>
    </ThemeProvider>
  ),
})