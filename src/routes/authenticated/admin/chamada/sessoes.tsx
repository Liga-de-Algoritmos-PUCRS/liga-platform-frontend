import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import client from '@/api/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'
import { PlusCircle, Calendar, Eye, CheckCircle2, Users } from 'lucide-react'

export const Route = createFileRoute('/authenticated/admin/chamada/sessoes')({
  component: AdminChamadaSessoes,
})

interface RollCallSummary {
  id: string
  date: string
  _count: { attendances: number }
}

function AdminChamadaSessoes() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: rollCalls, isLoading } = useQuery({
    queryKey: ['admin-roll-calls'],
    queryFn: async () => {
      const response = await client.rollCall.rollCallControllerFindAll()
      return response.data as unknown as RollCallSummary[]
    },
  })

  const createMutation = useMutation({
    mutationFn: async () => {
      const response = await client.rollCall.rollCallControllerCreate({ date: new Date().toISOString() })
      return response.data
    },
    onSuccess: (data: any) => {
      toast.success('Nova chamada iniciada!')
      queryClient.invalidateQueries({ queryKey: ['admin-roll-calls'] })
      // Navigate to the new session immediately
      if (data?.id) {
        navigate({ to: `/authenticated/admin/chamada/${data.id}` })
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar sessão de chamada')
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Carregando sessões...
      </div>
    )
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
        <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending} className="gap-2">
          <PlusCircle className="w-4 h-4" />
          {createMutation.isPending ? 'Criando...' : 'Nova Chamada (Hoje)'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Sessões</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Data</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    Presenças
                  </div>
                </TableHead>
                <TableHead className="text-right pr-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rollCalls && rollCalls.length > 0 ? (
                rollCalls.map((rc) => (
                  <TableRow
                    key={rc.id}
                    className="cursor-pointer hover:bg-white/5"
                    onClick={() => navigate({ to: `/authenticated/admin/chamada/${rc.id}` })}
                  >
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="font-medium">
                          {format(new Date(rc.date), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="font-medium text-green-400">{rc._count?.attendances || 0}</span>
                        <span className="text-muted-foreground text-xs">presentes</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate({ to: `/authenticated/admin/chamada/${rc.id}` })
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        Editar Presenças
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-12 text-muted-foreground">
                    <div className="flex flex-col items-center gap-3">
                      <Calendar className="w-10 h-10 opacity-30" />
                      <p>Nenhuma sessão de chamada ainda.</p>
                      <Button variant="outline" size="sm" onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
                        Criar primeira chamada
                      </Button>
                    </div>
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
