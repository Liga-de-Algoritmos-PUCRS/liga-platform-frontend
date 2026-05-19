import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import client from '@/api/client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { QRCodeSVG } from 'qrcode.react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'
import { QrCode, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/authenticated/admin/chamada/$id')({
  component: AdminChamadaDetails,
})

function AdminChamadaDetails() {
  const { id } = Route.useParams()
  const queryClient = useQueryClient()
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [qrCodeData, setQrCodeData] = useState<{ currentQrCode: string; qrCodeExpiresAt: string } | null>(null)

  const { data: rollCall, isLoading } = useQuery({
    queryKey: ['admin-roll-call', id],
    queryFn: async () => {
      const response = await client.rollCall.rollCallControllerFindOne(id)
      return response.data as unknown as {
        id: string
        date: string
        attendances: {
          id: string
          userId: string
          isPresent: boolean
          user: {
            id: string
            name: string
            email: string
          }
        }[]
      }
    },
  })

  // Start polling when modal is open
  useEffect(() => {
    let interval: NodeJS.Timeout

    const fetchQr = async () => {
      try {
        const res = await client.rollCall.rollCallControllerGenerateQrCode(id)
        setQrCodeData(res.data as any)
      } catch (err) {
        console.error('Failed to fetch QR code', err)
      }
    }

    if (qrModalOpen) {
      fetchQr() // fetch immediately
      interval = setInterval(fetchQr, 15000) // update every 15s
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [qrModalOpen, id])

  const toggleAttendanceMutation = useMutation({
    mutationFn: async ({ userId, isPresent }: { userId: string; isPresent: boolean }) => {
      const response = await client.rollCall.rollCallControllerUpdateAttendance(id, { userId, isPresent })
      return response.data
    },
    onMutate: async (variables) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['admin-roll-call', id] })
      const previous = queryClient.getQueryData(['admin-roll-call', id])
      
      queryClient.setQueryData(['admin-roll-call', id], (old: any) => {
        if (!old) return old
        const updatedAttendances = old.attendances.map((att: any) => {
          if (att.userId === variables.userId) {
            return { ...att, isPresent: variables.isPresent }
          }
          return att
        })
        return { ...old, attendances: updatedAttendances }
      })

      return { previous }
    },
    onError: (_err, _newTodo, context: any) => {
      queryClient.setQueryData(['admin-roll-call', id], context.previous)
      toast.error('Erro ao atualizar presença.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roll-call', id] })
    },
  })

  const handleToggle = (userId: string, currentStatus: boolean) => {
    toggleAttendanceMutation.mutate({ userId, isPresent: !currentStatus })
  }

  if (isLoading) {
    return <div className="p-6 text-center text-muted-foreground">Carregando detalhes da sessão...</div>
  }

  if (!rollCall) {
    return <div className="p-6 text-center text-red-500">Sessão não encontrada.</div>
  }

  const presences = rollCall.attendances.filter(a => a.isPresent).length
  const total = rollCall.attendances.length

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Link to="/authenticated/admin/chamada/sessoes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Detalhes da Chamada</h1>
          <p className="text-muted-foreground">
            {format(new Date(rollCall.date), "dd 'de' MMMM 'de' yyyy, 'às' HH:mm", { locale: ptBR })}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presenças / Total</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{presences} / {total}</div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 flex flex-row justify-between items-center px-6">
           <div className="flex flex-col gap-1">
             <CardTitle className="text-lg">Projetar QR Code</CardTitle>
             <CardDescription>
               Abra o QR Code para que os alunos possam escanear e registrar presença. 
               Ele atualiza automaticamente.
             </CardDescription>
           </div>
           
           <Dialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <QrCode className="w-5 h-5" />
                Exibir QR Code
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl flex flex-col items-center justify-center p-12">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl mb-4">Escaneie para registrar presença</DialogTitle>
              </DialogHeader>
              
              <div className="bg-white p-8 rounded-xl shadow-inner border">
                {qrCodeData ? (
                  <QRCodeSVG 
                    value={qrCodeData.currentQrCode} 
                    size={350}
                    level="H"
                    includeMargin={false}
                  />
                ) : (
                  <div className="w-[350px] h-[350px] flex items-center justify-center animate-pulse bg-slate-100 rounded-lg">
                    <QrCode className="w-16 h-16 text-slate-300" />
                  </div>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mt-6 text-center animate-pulse">
                Atualizando automaticamente...
              </p>
            </DialogContent>
          </Dialog>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
          <CardDescription>
            Ative ou desative manualmente a presença dos alunos nesta sessão.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rollCall.attendances.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.user.name}</TableCell>
                  <TableCell>{record.user.email}</TableCell>
                  <TableCell>
                    {record.isPresent ? (
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600">Presente</Badge>
                    ) : (
                      <Badge variant="destructive">Ausente</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch 
                      checked={record.isPresent}
                      onCheckedChange={() => handleToggle(record.userId, record.isPresent)}
                      aria-label="Toggle presence"
                    />
                  </TableCell>
                </TableRow>
              ))}
              {rollCall.attendances.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    Nenhum aluno cadastrado/encontrado.
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
