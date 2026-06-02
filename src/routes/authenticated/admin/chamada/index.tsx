import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import client from '@/api/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { List, Users, BookOpen, TrendingUp, Search, ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE = 10

export const Route = createFileRoute('/authenticated/admin/chamada/')({
  component: AdminChamadaOverview,
})

interface UserOverview {
  id: string
  name: string
  email: string
  avatarUrl?: string
  course?: string
  semester?: string
  totalAttendances: number
  totalMisses: number
  totalClasses: number
  attendanceRate: number
  history: { rollCallId: string; date: string; isPresent: boolean }[]
}

interface OverviewData {
  totalClasses: number
  users: UserOverview[]
}

function AttendanceBar({ rate }: { rate: number }) {
  const color =
    rate >= 75
      ? 'bg-green-500'
      : rate >= 50
      ? 'bg-yellow-500'
      : 'bg-red-500'

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${Math.min(rate, 100)}%` }}
        />
      </div>
      <span
        className={`text-xs font-bold w-10 text-right ${
          rate >= 75 ? 'text-green-400' : rate >= 50 ? 'text-yellow-400' : 'text-red-400'
        }`}
      >
        {rate}%
      </span>
    </div>
  )
}

export default function AdminChamadaOverview() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-chamada-overview'],
    queryFn: async () => {
      const response = await client.rollCall.rollCallControllerGetOverview()
      return response.data as unknown as OverviewData
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Carregando visão geral...
      </div>
    )
  }

  const users = data?.users || []
  const totalClasses = data?.totalClasses || 0
  const avgRate =
    users.length > 0
      ? Math.round(users.reduce((acc, u) => acc + u.attendanceRate, 0) / users.length)
      : 0
  const critical = users.filter((u) => u.attendanceRate < 75).length

  const filtered = [...users]
    .sort((a, b) => a.attendanceRate - b.attendanceRate)
    .filter(
      (u) =>
        !search ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()),
    )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className="flex flex-col gap-6 pt-20 px-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Frequência Geral</h1>
          <p className="text-muted-foreground">Acompanhe a presença de todos os alunos.</p>
        </div>
        <Link to="/authenticated/admin/chamada/sessoes">
          <Button variant="outline" className="gap-2">
            <List className="w-4 h-4" />
            Gerenciar Sessões
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Aulas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClasses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência Média</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${avgRate >= 75 ? 'text-green-400' : avgRate >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
              {avgRate}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos Críticos</CardTitle>
            <span className="text-xs text-muted-foreground">{'< 75%'}</span>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${critical > 0 ? 'text-red-400' : 'text-green-400'}`}>
              {critical}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <CardTitle>Frequência por Aluno</CardTitle>
          {/* Search */}
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Buscar aluno por nome ou e-mail..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Aluno</TableHead>
                <TableHead className="text-center">Presenças</TableHead>
                <TableHead className="text-center">Faltas</TableHead>
                <TableHead className="text-center">Situação</TableHead>
                <TableHead className="w-48">Frequência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.length > 0 ? (
                paged.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback className="bg-primary/20 text-primary text-xs">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium text-green-400">{user.totalAttendances}</span>
                        <span className="text-muted-foreground text-xs"> /{user.totalClasses}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`font-medium ${user.totalMisses > 0 ? 'text-red-400' : 'text-muted-foreground'}`}>
                          {user.totalMisses}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {user.attendanceRate >= 75 ? (
                          <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">Regular</Badge>
                        ) : user.attendanceRate >= 50 ? (
                          <Badge variant="default" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Atenção</Badge>
                        ) : (
                          <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">Crítico</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <AttendanceBar rate={user.attendanceRate} />
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    Nenhum aluno encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <p className="text-xs text-muted-foreground">
                Página {currentPage} de {totalPages} · {filtered.length} alunos
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Próxima <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
