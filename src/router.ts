import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Instância própria (fora de main.tsx) para poder navegar de fora da árvore
// de componentes do RouterProvider — ex. AuthProvider, que é ancestral dele
// e não tem acesso ao contexto que useNavigate() precisa.
export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
})
