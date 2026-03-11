import { createFileRoute } from '@tanstack/react-router'
import { ProblemDetailsPage } from '@/pages/ProblemDetailsPage'

export const Route = createFileRoute('/problemas/$problemId')({
  component: ProblemDetailsPage,
})