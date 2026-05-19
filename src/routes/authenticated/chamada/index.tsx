import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import client from '@/api/client'
import { QrScanner } from '@/components/QrScanner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react'

export const Route = createFileRoute('/authenticated/chamada/')({
  component: UserChamadaComponent,
})

function UserChamadaComponent() {
  const queryClient = useQueryClient()

  const { data: myAttendancesData, isLoading } = useQuery({
    queryKey: ['my-attendances'],
    queryFn: async () => {
      const response = await client.rollCall.rollCallControllerGetMyAttendances()
      return response.data as unknown as {
        totalClasses: number
        totalAttendances: number
        totalMisses: number
        history: {
          rollCallId: string
          date: string
          isPresent: boolean
        }[]
      }
    },
  })

  const attendMutation = useMutation({
    mutationFn: async (uuid: string) => {
      const response = await client.rollCall.rollCallControllerAttend({ uuid })
      return response.data
    },
    onSuccess: () => {
      toast.success('Presença registrada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['my-attendances'] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao registrar presença')
    },
  })

  const handleScan = (data: string) => {
    attendMutation.mutate(data)
  }

  if (isLoading) {
    return <div className="p-6 text-center text-muted-foreground">Carregando dados...</div>
  }

  const data = myAttendancesData

  return (
    <div className="flex flex-col gap-6 pt-20 px-6 pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Presenças</h1>
        <p className="text-muted-foreground">
          Gerencie suas presenças e registre sua participação nas aulas.
        </p>
      </div>

      <div className="flex justify-center my-4">
        <QrScanner onScan={handleScan} disabled={attendMutation.isPending} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aulas Totais</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalClasses || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presenças</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{data?.totalAttendances || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faltas</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{data?.totalMisses || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Aulas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.history && data.history.length > 0 ? (
                data.history.map((record) => (
                  <TableRow key={record.rollCallId}>
                    <TableCell>
                      {format(new Date(record.date), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      {record.isPresent ? (
                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">Presente</Badge>
                      ) : (
                        <Badge variant="destructive">Faltou</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-6 text-muted-foreground">
                    Nenhuma aula registrada ainda.
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
