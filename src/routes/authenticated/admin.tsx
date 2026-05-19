import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/authenticated/admin')({
  beforeLoad: ({ context }) => {
    const user = context.auth.user;     
    if (!user || (user.role !== 'ADMIN' && user.role !== 'ROOT')) {
      throw redirect({ to: '/' })
    }
  },
  component: () => <Outlet />,
})