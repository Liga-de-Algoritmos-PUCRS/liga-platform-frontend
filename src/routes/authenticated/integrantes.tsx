import { createFileRoute } from '@tanstack/react-router'
import { MembersPage } from '@/pages/MembersPage'

export const Route = createFileRoute('/authenticated/integrantes')({
  component: MembersPage,
})

