import { createFileRoute, redirect } from '@tanstack/react-router'
import AdminPage from '@/pages/AdminPage'

export const Route = createFileRoute('/authenticated/admin')({
  beforeLoad: ({ context }) => {
    const user = context.auth.user;     
    if (!user || (user.role !== 'ADMIN' && user.role !== 'ROOT')) {
      throw redirect({ to: '/' })
    }
  },
  component: AdminPage,
})