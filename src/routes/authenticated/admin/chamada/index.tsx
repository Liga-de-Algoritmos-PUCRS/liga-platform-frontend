import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import client from '@/api/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { List, Users } from 'lucide-react'

export const Route = createFileRoute('/authenticated/admin/chamada/')({
  component: AdminChamadaOverview,
})

function AdminChamadaOverview() {
  const { data: overviewData, isLoading } = useQuery({
    queryKey: ['admin-chamada-overview'],
    queryFn: async () => {
      const response = await client.rollCall.rollCallControllerGetOverview()
      return response.data as unknown as {
        users: {
          id: string
          name: string
          email: string
          totalAttendances: number
          totalMisses: number
          totalClasses: number
        }[]
      }
    },
  })

  if (isLoading) {
    return <div className="p-6 text-center text-muted-foreground">Carregando visão geral...</div>
  }

  const users = overviewData?.users || []

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Visão Geral de Chamadas</h1>
          <p className="text-muted-foreground">
            Acompanhe a frequência de todos os alunos.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/authenticated/admin/chamada/sessoes">
            <Button variant="outline" className="gap-2">
              <List className="w-4 h-4" />
              Sessões
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequência dos Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Presenças</TableHead>
                <TableHead className="text-right">Faltas</TableHead>
                <TableHead className="text-right">Total Aulas</TableHead>
                <TableHead className="text-right">% Frequência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => {
                  const frequency = user.totalClasses > 0 
                    ? Math.round((user.totalAttendances / user.totalClasses) * 100) 
                    : 0
                    
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="text-right text-green-500 font-medium">{user.totalAttendances}</TableCell>
                      <TableCell className="text-right text-red-500 font-medium">{user.totalMisses}</TableCell>
                      <TableCell className="text-right">{user.totalClasses}</TableCell>
                      <TableCell className="text-right">
                        <span className={frequency < 75 ? 'text-red-500 font-bold' : 'text-green-500 font-bold'}>
                          {frequency}%
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Nenhum aluno encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
