import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import client from '@/api/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { QRCodeSVG } from 'qrcode.react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'
import { QrCode, ArrowLeft, CheckCircle2, XCircle, Users, Search, Check, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/authenticated/admin/chamada/$id')({
  component: AdminChamadaDetails,
})

interface AttendanceRecord {
  id: string
  userId: string
  isPresent: boolean
  user: {
    id: string
    name: string
    email: string
    avatarUrl?: string
  }
}

interface RollCallDetail {
  id: string
  date: string
  totalUsers: number
  totalPresent: number
  totalAbsent: number
  attendances: AttendanceRecord[]
}

function AdminChamadaDetails() {
  const { id } = Route.useParams()
  const queryClient = useQueryClient()
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [qrCodeData, setQrCodeData] = useState<{ currentQrCode: string; qrCodeExpiresAt: string } | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'present' | 'absent'>('all')

  const { data: rollCall, isLoading } = useQuery({
    queryKey: ['admin-roll-call', id],
    queryFn: async () => {
      const response = await client.rollCall.rollCallControllerFindOne(id)
      return response.data as unknown as RollCallDetail
    },
  })

  // QR Code polling when modal is open
  useEffect(() => {
    if (!qrModalOpen) return
    let interval: ReturnType<typeof setInterval>

    const fetchQr = async () => {
      try {
        const res = await client.rollCall.rollCallControllerGenerateQrCode(id)
        setQrCodeData(res.data as unknown as { currentQrCode: string; qrCodeExpiresAt: string })
      } catch { /* ignore */ }
    }

    fetchQr()
    interval = setInterval(fetchQr, 15000)
    return () => clearInterval(interval)
  }, [qrModalOpen, id])

  const toggleMutation = useMutation({
    mutationFn: async ({ userId, isPresent }: { userId: string; isPresent: boolean }) => {
      await client.rollCall.rollCallControllerUpdateAttendance(id, { userId, isPresent })
    },
    onMutate: async ({ userId, isPresent }) => {
      await queryClient.cancelQueries({ queryKey: ['admin-roll-call', id] })
      const previous = queryClient.getQueryData(['admin-roll-call', id])

      queryClient.setQueryData(['admin-roll-call', id], (old: any) => {
        if (!old) return old
        return {
          ...old,
          totalPresent: isPresent ? old.totalPresent + 1 : old.totalPresent - 1,
          totalAbsent: isPresent ? old.totalAbsent - 1 : old.totalAbsent + 1,
          attendances: old.attendances.map((att: AttendanceRecord) =>
            att.userId === userId ? { ...att, isPresent } : att
          ),
        }
      })
      return { previous }
    },
    onError: (_err, _vars, context: any) => {
      queryClient.setQueryData(['admin-roll-call', id], context.previous)
      toast.error('Erro ao atualizar presença.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roll-call', id] })
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Carregando chamada...
      </div>
    )
  }

  if (!rollCall) {
    return <div className="p-6 text-center text-red-400">Sessão não encontrada.</div>
  }

  const filteredAttendances = (rollCall.attendances || []).filter((a) => {
    const matchesSearch =
      !search ||
      a.user.name.toLowerCase().includes(search.toLowerCase()) ||
      a.user.email.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === 'all' ||
      (filter === 'present' && a.isPresent) ||
      (filter === 'absent' && !a.isPresent)
    return matchesSearch && matchesFilter
  })

  // Sort: absent first for easier editing
  const sorted = [...filteredAttendances].sort((a, b) => {
    if (a.isPresent === b.isPresent) return a.user.name.localeCompare(b.user.name)
    return a.isPresent ? 1 : -1
  })

  const presenceRate =
    rollCall.totalUsers > 0
      ? Math.round((rollCall.totalPresent / rollCall.totalUsers) * 100)
      : 0

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/authenticated/admin/chamada/sessoes">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Lista de Chamada</h1>
          <p className="text-muted-foreground capitalize">
            {format(new Date(rollCall.date), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>

        {/* QR Code Button */}
        <Dialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2 shrink-0">
              <QrCode className="w-5 h-5" />
              Exibir QR Code
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg flex flex-col items-center p-10 gap-6">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">Escaneie para registrar presença</DialogTitle>
            </DialogHeader>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              {qrCodeData ? (
                <QRCodeSVG value={qrCodeData.currentQrCode} size={280} level="H" />
              ) : (
                <div className="w-[280px] h-[280px] flex items-center justify-center animate-pulse bg-slate-100 rounded-xl">
                  <QrCode className="w-16 h-16 text-slate-300" />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground animate-pulse">Atualizando automaticamente a cada 15s...</p>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rollCall.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Presentes</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{rollCall.totalPresent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ausentes</CardTitle>
            <XCircle className="w-4 h-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{rollCall.totalAbsent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Frequência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold", presenceRate >= 75 ? "text-green-400" : presenceRate >= 50 ? "text-yellow-400" : "text-red-400")}>
              {presenceRate}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance list */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Alunos</CardTitle>
              <CardDescription>Clique em ✓ ou ✗ para alterar a presença manualmente.</CardDescription>
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'absent', 'present'] as const).map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? 'default' : 'outline'}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "text-xs",
                    filter === f && f === 'present' && "bg-green-600 hover:bg-green-700 border-green-600",
                    filter === f && f === 'absent' && "bg-red-600 hover:bg-red-700 border-red-600",
                  )}
                >
                  {f === 'all' ? 'Todos' : f === 'present' ? 'Presentes' : 'Ausentes'}
                </Button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Buscar aluno por nome ou e-mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6 w-12">#</TableHead>
                <TableHead>Aluno</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center w-40">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.length > 0 ? (
                sorted.map((record, index) => (
                  <TableRow
                    key={record.id}
                    className={cn(
                      "transition-colors",
                      record.isPresent ? "bg-green-500/5" : "bg-red-500/5 hover:bg-red-500/10"
                    )}
                  >
                    <TableCell className="pl-6 text-muted-foreground text-sm">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarImage src={record.user.avatarUrl} alt={record.user.name} />
                          <AvatarFallback className="text-xs bg-muted">
                            {record.user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm leading-none">{record.user.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{record.user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {record.isPresent ? (
                        <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Presente
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 gap-1">
                          <XCircle className="w-3 h-3" /> Ausente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={record.isPresent || toggleMutation.isPending}
                          onClick={() => toggleMutation.mutate({ userId: record.userId, isPresent: true })}
                          className={cn(
                            "h-8 w-8 p-0 rounded-full",
                            record.isPresent
                              ? "text-green-500 bg-green-500/20 cursor-default"
                              : "hover:bg-green-500/20 hover:text-green-400"
                          )}
                          title="Marcar como presente"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={!record.isPresent || toggleMutation.isPending}
                          onClick={() => toggleMutation.mutate({ userId: record.userId, isPresent: false })}
                          className={cn(
                            "h-8 w-8 p-0 rounded-full",
                            !record.isPresent
                              ? "text-red-500 bg-red-500/20 cursor-default"
                              : "hover:bg-red-500/20 hover:text-red-400"
                          )}
                          title="Marcar como ausente"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
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
