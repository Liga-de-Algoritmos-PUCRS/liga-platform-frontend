import { createFileRoute } from '@tanstack/react-router'
import { RankingPage } from '@/pages/RankingPage'

export const Route = createFileRoute('/ranking/')({
  component: RankingPage,
})

