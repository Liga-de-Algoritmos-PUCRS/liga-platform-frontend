import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  RefreshCcw, CheckCircle2, Clock, Trash2, AlertTriangle, Search,
  ArrowUp, ArrowDown, ArrowUpDown, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import client from "@/api/client";
import { UserInfoModal } from "@/components/ranking/UserInfoModal";
import { UserResponseDTO, SubmitResponseDTO } from "@/api/sdk";
import { useAuth } from "@/providers/AuthProvider";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";

interface EnrichedSubmission {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userFullData: UserResponseDTO | null;
  problemId: string;
  problemTitle: string;
  problemDifficulty: string;
  attempts: number;
  isFinished: boolean;
  pointsEarned: number;
  createdAt: string;
  finishedAt: string | null;
}

type SortColumn = "user" | "problem" | "attempts" | "status" | "date";
type SortDirection = "asc" | "desc";

const PAGE_SIZE = 25;

function SortHeader({
  column,
  label,
  className,
  sort,
  onSort,
}: {
  column: SortColumn;
  label: string;
  className?: string;
  sort: { column: SortColumn; direction: SortDirection };
  onSort: (column: SortColumn) => void;
}) {
  return (
    <button
      onClick={() => onSort(column)}
      className={cn("flex items-center gap-1.5 font-semibold tracking-wider hover:text-white transition-colors", className)}
    >
      {label}
      {sort.column === column ? (
        sort.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />
      ) : (
        <ArrowUpDown size={12} className="opacity-40" />
      )}
    </button>
  );
}

export function SubmissionsTable() {
  const { user: currentUser, refetchUser } = useAuth();
  const queryClient = useQueryClient();

  const [selectedUser, setSelectedUser] = useState<UserResponseDTO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingSubmission, setDeletingSubmission] = useState<EnrichedSubmission | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<{ column: SortColumn; direction: SortDirection }>({
    column: "date",
    direction: "desc",
  });
  const [page, setPage] = useState(1);

  const {
    data: submissionsResponse,
    isLoading: isLoadingSubmissions,
    refetch: refetchSubmissions,
  } = useQuery({
    queryKey: queryKeys.adminSubmissions,
    queryFn: () => client.submit.submitControllerGetAllSubmits(),
  });

  const { data: usersResponse, isLoading: isLoadingUsers } = useQuery({
    queryKey: queryKeys.adminUsers,
    queryFn: () => client.user.userControllerGetAllUsers(),
  });

  const { data: problemsResponse, isLoading: isLoadingProblems } = useQuery({
    queryKey: queryKeys.adminProblems,
    queryFn: () => client.problem.problemControllerGetAllAdminProblems(),
  });

  const loading = isLoadingSubmissions || isLoadingUsers || isLoadingProblems;

  const enrichedSubmissions = useMemo(() => {
    const rawSubs = submissionsResponse?.data;
    const subsData = Array.isArray(rawSubs) ? rawSubs : rawSubs ? [rawSubs as SubmitResponseDTO] : [];
    const usersData = usersResponse?.data || [];
    const probsData = problemsResponse?.data || [];

    return subsData.map((sub: SubmitResponseDTO): EnrichedSubmission => {
      const user = usersData.find((u) => u.id === sub.userId);
      const problem = probsData.find((p) => p.id === sub.problemId);

      return {
        id: sub.id,
        userId: sub.userId,
        userName: user?.name || "Usuário Deletado",
        userEmail: user?.email || "",
        userFullData: user || null,
        problemId: sub.problemId,
        problemTitle: problem?.title || "Problema Deletado",
        problemDifficulty: problem?.difficulty || "UNKNOWN",
        attempts: sub.attempts || 0,
        isFinished: sub.isFinished || false,
        pointsEarned: sub.pointsEarned || 0,
        createdAt: sub.createdAt,
        finishedAt: sub.finishedAt || null,
      };
    });
  }, [submissionsResponse?.data, usersResponse?.data, problemsResponse?.data]);

  const filteredSubmissions = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return enrichedSubmissions;
    return enrichedSubmissions.filter(
      (s) =>
        s.userName.toLowerCase().includes(term) ||
        s.userEmail.toLowerCase().includes(term) ||
        s.problemTitle.toLowerCase().includes(term)
    );
  }, [enrichedSubmissions, searchTerm]);

  const sortedSubmissions = useMemo(() => {
    const dir = sort.direction === "asc" ? 1 : -1;
    return [...filteredSubmissions].sort((a, b) => {
      switch (sort.column) {
        case "user":
          return a.userName.localeCompare(b.userName) * dir;
        case "problem":
          return a.problemTitle.localeCompare(b.problemTitle) * dir;
        case "attempts":
          return (a.attempts - b.attempts) * dir;
        case "status":
          return (Number(a.isFinished) - Number(b.isFinished)) * dir;
        case "date":
        default:
          return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir;
      }
    });
  }, [filteredSubmissions, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedSubmissions.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedSubmissions = sortedSubmissions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleSort = (column: SortColumn) => {
    setSort((prev) =>
      prev.column === column
        ? { column, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { column, direction: "asc" }
    );
    setPage(1);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => client.submit.submitControllerDeleteSubmit(id),
    onSuccess: async () => {
      toast.success("Submissão eliminada com sucesso!");
      const deletedOwnSubmission = deletingSubmission?.userId === currentUser?.id;
      setDeletingSubmission(null);
      queryClient.invalidateQueries({ queryKey: queryKeys.adminSubmissions });
      queryClient.invalidateQueries({ queryKey: queryKeys.adminUsers });
      queryClient.invalidateQueries({ queryKey: queryKeys.adminProblems });
      queryClient.invalidateQueries({ queryKey: queryKeys.problems });
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions(currentUser?.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.ranking('monthly') });
      queryClient.invalidateQueries({ queryKey: queryKeys.ranking('alltime') });
      if (deletedOwnSubmission) {
        await refetchUser();
      }
    },
    onError: () => {
      toast.error("Falha ao eliminar submissão.");
    },
  });

  const handleDeleteSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deletingSubmission) return;
    deleteMutation.mutate(deletingSubmission.id);
  };

  const handleUserClick = (user: UserResponseDTO | null) => {
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const renderDifficultyBadge = (difficulty: string) => {
    const diff = difficulty.toUpperCase();

    if (diff === 'EASY' || diff === 'FÁCIL' || diff === 'FACIL') {
      return (
        <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Fácil
        </span>
      );
    }
    if (diff === 'MEDIUM' || diff === 'MÉDIO' || diff === 'MEDIO') {
      return (
        <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
          Médio
        </span>
      );
    }
    if (diff === 'HARD' || diff === 'DIFÍCIL' || diff === 'DIFICIL') {
      return (
        <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
          Difícil
        </span>
      );
    }
    return null;
  };

  return (
    <Card className="bg-background/50 border-white/10 text-white shadow-xl py-4">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle>Histórico Geral de Submissões</CardTitle>
          <CardDescription className="text-gray-400">
            Acompanhe em tempo real o código enviado por todos os usuários.
          </CardDescription>
        </div>

        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Pesquisar aluno ou problema..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white focus-visible:ring-primary w-full"
            />
          </div>
          <button
            onClick={() => refetchSubmissions()}
            disabled={loading}
            className="flex items-center justify-center p-2.5 sm:px-4 sm:py-2 bg-secondary/40 hover:bg-secondary/80 border border-white/5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 shrink-0"
            title="Atualizar lista"
          >
            <RefreshCcw size={16} className={cn(loading && "animate-spin", "sm:mr-2")} />
            <span className="hidden sm:inline">Atualizar</span>
          </button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-xl border border-white/10 overflow-hidden bg-black/20">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left table-fixed min-w-[1000px]">
              <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
                <tr>
                  <th className="w-[18%] px-6 py-4"><SortHeader column="user" label="Usuário" sort={sort} onSort={handleSort} /></th>
                  <th className="w-[30%] px-6 py-4"><SortHeader column="problem" label="Problema" sort={sort} onSort={handleSort} /></th>
                  <th className="w-[10%] px-6 py-4 text-center"><SortHeader column="attempts" label="Tentativas" className="justify-center" sort={sort} onSort={handleSort} /></th>
                  <th className="w-[14%] px-6 py-4 text-center"><SortHeader column="status" label="Status" className="justify-center" sort={sort} onSort={handleSort} /></th>
                  <th className="w-[16%] px-6 py-4 text-right"><SortHeader column="date" label="Data" className="justify-end" sort={sort} onSort={handleSort} /></th>
                  <th className="w-[12%] px-6 py-4 font-semibold tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <RefreshCcw size={24} className="animate-spin text-primary/50" />
                        <span>Buscando registros...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      {searchTerm ? "Nenhuma submissão encontrada com esta pesquisa." : "Nenhuma submissão encontrada."}
                    </td>
                  </tr>
                ) : (
                  paginatedSubmissions.map((sub) => (
                    <tr key={sub.id} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors">
                      <td className="px-6 py-4 truncate">
                        <button
                          onClick={() => handleUserClick(sub.userFullData)}
                          className="font-semibold hover:text-primary hover:underline text-left transition-colors truncate w-full"
                          title={sub.userName}
                        >
                          {sub.userName}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 w-full">
                          <span
                            className="truncate font-medium text-gray-200"
                            title={sub.problemTitle}
                          >
                            {sub.problemTitle}
                          </span>
                          {renderDifficultyBadge(sub.problemDifficulty)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-gray-300">
                        {sub.attempts}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          {sub.isFinished ? (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold w-fit border border-emerald-500/20 whitespace-nowrap">
                              <CheckCircle2 size={14} />
                              Resolvido
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold w-fit border border-amber-500/20 whitespace-nowrap">
                              <Clock size={14} />
                              Tentando
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-400 text-xs font-mono truncate">
                        {new Date(sub.isFinished && sub.finishedAt ? sub.finishedAt : sub.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => setDeletingSubmission(sub)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-md transition-colors border border-red-500/20"
                            title="Eliminar Submissão"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && sortedSubmissions.length > 0 && (
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-white/10 text-xs text-gray-400">
              <span>
                {sortedSubmissions.length} submiss{sortedSubmissions.length === 1 ? "ão" : "ões"}
                {searchTerm ? " (filtradas)" : ""} · página {currentPage} de {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="p-1.5 rounded-md bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="p-1.5 rounded-md bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <UserInfoModal
        user={selectedUser as UserResponseDTO}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Dialog open={!!deletingSubmission} onOpenChange={(open) => !open && !deleteMutation.isPending && setDeletingSubmission(null)}>
        <DialogContent className="bg-[#0a0a0b] border-red-500/20 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-500 flex items-center gap-2">
              <AlertTriangle size={20} /> Eliminar Submissão
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDeleteSubmission} className="space-y-4 py-2">
            <p className="text-sm text-gray-400">
              Pretende eliminar a submissão de <strong className="text-white">{deletingSubmission?.userName}</strong> para{" "}
              <strong className="text-white">{deletingSubmission?.problemTitle}</strong>?
            </p>
            <p className="text-sm text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
              {deletingSubmission?.isFinished
                ? `Esta submissão está resolvida: devolve ${deletingSubmission?.pointsEarned} pontos ao aluno e sobe o valor corrente do problema.`
                : "Esta submissão está pendente: não mexe em pontuação nenhuma."}
            </p>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setDeletingSubmission(null)} disabled={deleteMutation.isPending}>
                Cancelar
              </Button>
              <Button type="submit" disabled={deleteMutation.isPending} className="bg-red-500 hover:bg-red-600">
                {deleteMutation.isPending ? "A eliminar..." : "Sim, Eliminar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
