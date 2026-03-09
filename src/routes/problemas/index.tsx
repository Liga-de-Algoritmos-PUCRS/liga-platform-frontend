import { createFileRoute } from '@tanstack/react-router'
import { ProblemsPage } from '@/pages/ProblemsPage'

export const Route = createFileRoute('/problemas/')({
  component: ProblemsPage,
})
