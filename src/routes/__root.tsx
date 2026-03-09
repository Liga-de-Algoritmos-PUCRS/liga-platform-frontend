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
      <div className="min-h-screen w-full flex flex-col">
        <header className="z-40">
          <Navbar />
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  ),
})