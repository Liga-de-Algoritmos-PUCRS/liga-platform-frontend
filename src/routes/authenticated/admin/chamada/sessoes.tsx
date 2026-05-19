import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import client from '@/api/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'
import { PlusCircle, Calendar, Eye } from 'lucide-react'

export const Route = createFileRoute('/authenticated/admin/chamada/sessoes')({
  component: AdminChamadaSessoes,
})

function AdminChamadaSessoes() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: rollCalls, isLoading } = useQuery({
    queryKey: ['admin-roll-calls'],
    queryFn: async () => {
      const response = await client.rollCall.rollCallControllerFindAll()
      return response.data as unknown as {
        id: string
        date: string
        _count: { attendances: number }
      }[]
    },
  })

  const createMutation = useMutation({
    mutationFn: async () => {
      // Create a roll call for the current date
      const response = await client.rollCall.rollCallControllerCreate({ date: new Date().toISOString() })
      return response.data
    },
    onSuccess: () => {
      toast.success('Nova chamada iniciada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['admin-roll-calls'] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar sessão de chamada')
    },
  })

  const handleCreate = () => {
    createMutation.mutate()
  }

  if (isLoading) {
    return <div className="p-6 text-center text-muted-foreground">Carregando sessões...</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sessões de Chamada</h1>
          <p className="text-muted-foreground">
            Gerencie e crie novas sessões de chamada.
          </p>
        </div>
        <Button onClick={handleCreate} disabled={createMutation.isPending} className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Nova Chamada (Hoje)
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Sessões</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Presenças Registradas</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rollCalls && rollCalls.length > 0 ? (
                rollCalls.map((rc) => (
                  <TableRow key={rc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {format(new Date(rc.date), "dd 'de' MMMM, yyyy - HH:mm", { locale: ptBR })}
                      </div>
                    </TableCell>
                    <TableCell>{rc._count?.attendances || 0} alunos</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => navigate({ to: `/authenticated/admin/chamada/${rc.id}` })}>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                    Nenhuma sessão de chamada encontrada.
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
