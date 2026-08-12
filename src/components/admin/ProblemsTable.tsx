import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw, Edit2, Trash2, Eye, EyeOff, AlertTriangle, Search, FileCode2, Star, Pin, PinOff, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import client from "@/api/client";
import { ProblemResponseDTO, UpdateProblemDTO } from "@/api/sdk";
import { CreateProblemModal } from "@/components/admin/CreateProblemModal";
import { toast } from "sonner";
import {
  DEFAULT_DECREMENT,
  DEFAULT_FLOOR_POINTS,
  DEFAULT_INITIAL_POINTS,
  hasScoringErrors,
  validateScoring,
  type ScoringErrors,
} from "@/lib/problem-scoring";

export function ProblemsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<ProblemResponseDTO | null>(null);
  const [deletingProblem, setDeletingProblem] = useState<ProblemResponseDTO | null>(null);
  const [editFormData, setEditFormData] = useState<UpdateProblemDTO>({});
  const [scoringErrors, setScoringErrors] = useState<ScoringErrors>({});
  const [restartingProblem, setRestartingProblem] = useState<ProblemResponseDTO | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { data: response, isLoading: loading, refetch } = useQuery({
    queryKey: ['adminProblems'],
    queryFn: () => client.problem.problemControllerGetAllAdminProblems(),
  });

  const problems = useMemo(() => {
    if (!response?.data) return [];
    return [...response.data].sort((a, b) => {
      if (a.fixed && !b.fixed) return -1;
      if (!a.fixed && b.fixed) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [response?.data]);

  const filteredProblems = problems.filter((problem) => 
    problem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProblem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deletingProblem) return;
    setActionLoading(true);
    try {
      await client.problem.problemControllerDeleteProblem(deletingProblem.id);
      setDeletingProblem(null);
      toast.success("Problema eliminado com sucesso!");
      await refetch(); // Recarrega os dados através do React Query
    } catch {
      toast.error("Falha ao eliminar problema.");
    } finally {
      setActionLoading(false);
    }
  };

  // O valor corrente (`points`) não é editável no formulário: só o botão
  // "Reiniciar corrida" mexe nele. Mandá-lo junto brigaria com o clamp do back.
  // O fallback sai do problema que está aberto, não dos defaults: cair nos
  // defaults gravaria 100/70/5 em cima da configuração real do problema.
  const editScoring = {
    initialPoints:
      editFormData.initialPoints ?? editingProblem?.initialPoints ?? DEFAULT_INITIAL_POINTS,
    floorPoints: editFormData.floorPoints ?? editingProblem?.floorPoints ?? DEFAULT_FLOOR_POINTS,
    decrement: editFormData.decrement ?? editingProblem?.decrement ?? DEFAULT_DECREMENT,
  };

  const handleUpdateProblem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProblem) return;

    const errors = validateScoring(editScoring);
    setScoringErrors(errors);
    if (hasScoringErrors(errors)) return;

    setActionLoading(true);
    try {
      const payload: UpdateProblemDTO = {
        title: editFormData.title,
        description: editFormData.description,
        difficulty: editFormData.difficulty,
        answer: editFormData.answer,
        input: editFormData.input,
        initialPoints: editScoring.initialPoints,
        floorPoints: editScoring.floorPoints,
        decrement: editScoring.decrement
      };
      if (editFormData.bannerUrl === "") payload.bannerUrl = "";

      await client.problem.problemControllerUpdateProblem(editingProblem.id, payload);
      setEditingProblem(null);
      toast.success("Problema atualizado com sucesso!");
      await refetch(); // Recarrega os dados através do React Query
    } catch {
      toast.error("Falha ao atualizar problema.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestartRace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restartingProblem) return;
    setActionLoading(true);
    try {
      await client.problem.problemControllerUpdateProblem(restartingProblem.id, {
        points: restartingProblem.initialPoints
      });
      setRestartingProblem(null);
      setEditingProblem(null);
      toast.success("Corrida reiniciada: o problema voltou ao valor inicial.");
      await refetch();
    } catch {
      toast.error("Falha ao reiniciar a corrida.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleArchive = async (problem: ProblemResponseDTO) => {
    try {
      await client.problem.problemControllerUpdateProblem(problem.id, {
        archived: !problem.archived
      });
      toast.success(problem.archived ? "Problema desarquivado!" : "Problema arquivado!");
      await refetch();
    } catch {
      toast.error("Falha ao atualizar o estado de arquivo.");
    }
  };

  const handleTogglePin = async (problem: ProblemResponseDTO) => {
    try {
      await client.problem.problemControllerUpdateProblem(problem.id, {
        fixed: !problem.fixed
      });
      toast.success(problem.fixed ? "Problema desafixado!" : "Problema fixado no topo!");
      await refetch();
    } catch {
      toast.error("Falha ao fixar/desafixar o problema.");
    }
  };

  return (
    <Card className="bg-background/50 border-white/10 text-white shadow-xl py-4 relative">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <FileCode2 size={20} className="text-primary" />
            Catálogo de Problemas
          </CardTitle>
          <CardDescription className="text-gray-400">
            Adicione novos desafios, edite, arquive ou exclua problemas existentes.
          </CardDescription>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Pesquisar problema..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white focus-visible:ring-primary w-full"
            />
          </div>
          <button 
            onClick={() => refetch()}
            disabled={loading}
            className="flex items-center justify-center p-2.5 sm:px-4 sm:py-2 bg-secondary/40 hover:bg-secondary/80 border border-white/5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 shrink-0"
            title="Atualizar lista"
          >
            <RefreshCcw size={16} className={cn(loading && "animate-spin", "sm:mr-2")} />
            <span className="hidden sm:inline">Atualizar</span>
          </button>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary text-white hover:bg-primary/90 shrink-0"
          >
            + Novo Problema
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-xl border border-white/10 overflow-hidden bg-black/20">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left table-fixed min-w-[900px]">
              <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
                <tr>
                  <th className="w-[30%] px-6 py-4 font-semibold tracking-wider">Nome do Problema</th>
                  <th className="w-[15%] px-6 py-4 font-semibold tracking-wider text-center">Submissões</th>
                  <th className="w-[10%] px-6 py-4 font-semibold tracking-wider text-center">Acertos</th>
                  <th className="w-[15%] px-6 py-4 font-semibold tracking-wider text-center">Pontos</th>
                  <th className="w-[15%] px-6 py-4 font-semibold tracking-wider text-center">Data</th>
                  <th className="w-[20%] px-6 py-4 font-semibold tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <RefreshCcw size={24} className="animate-spin text-primary/50" />
                        <span>A carregar problemas...</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProblems.map((problem) => (
                    <tr key={problem.id} className={cn(
                      "border-b border-white/5 transition-colors",
                      problem.archived ? "bg-white/[0.02] opacity-60" : "hover:bg-white/[0.04]",
                      problem.fixed && !problem.archived ? "bg-primary/5" : ""
                    )}>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            {problem.fixed && <Pin size={14} className="text-primary fill-primary/20 shrink-0" />}
                            <span className="font-semibold text-gray-200 truncate">{problem.title}</span>
                            {problem.archived && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                Arquivado
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono uppercase mt-0.5">
                            Dificuldade: {problem.difficulty}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-gray-300">{problem.submissions || 0}</td>
                      <td className="px-6 py-4 text-center font-mono text-emerald-400 font-bold">{problem.resolved || 0}</td>
                      <td className="px-6 py-4">
                        <div
                          className="flex items-center justify-center gap-1.5 text-amber-400 font-mono font-bold"
                          title={`Valor corrente: ${problem.points} • Inicial: ${problem.initialPoints} • Piso: ${problem.floorPoints} • Decremento: ${problem.decrement}`}
                        >
                          <Star size={14} className="fill-amber-400/20" />
                          {problem.points || 0}
                          <span className="text-gray-500 font-normal">/ {problem.initialPoints}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-400 text-xs font-mono">
                        {new Date(problem.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => handleTogglePin(problem)}
                            className={cn("p-2 rounded-md transition-all border", problem.fixed ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-gray-300 border-white/5")}
                          >
                            {problem.fixed ? <PinOff size={16} /> : <Pin size={16} />}
                          </button>
                          <button 
                            onClick={() => {
                              setEditingProblem(problem);
                              setEditFormData({ ...problem });
                              setScoringErrors({});
                            }}
                            className="p-2 bg-white/5 text-gray-300 rounded-md border border-white/5"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleToggleArchive(problem)}
                            className={cn("p-2 rounded-md transition-all border", problem.archived ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-gray-300")}
                          >
                            {problem.archived ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                          <button onClick={() => setDeletingProblem(problem)} className="p-2 bg-red-500/10 text-red-400 rounded-md border border-red-500/20">
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
        </div>
      </CardContent>

      <CreateProblemModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSuccess={() => refetch()} />

     <Dialog open={!!editingProblem} onOpenChange={(open) => !open && setEditingProblem(null)}>
        <DialogContent className="bg-[#0a0a0b] border-white/10 text-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Editar Problema</DialogTitle></DialogHeader>
          <form onSubmit={handleUpdateProblem} className="space-y-5 py-4">
            <div className="space-y-2">
              <Label className="text-gray-400">Título</Label>
              <Input value={editFormData.title || ""} onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Descrição</Label>
              <textarea rows={4} value={editFormData.description || ""} onChange={(e) => setEditFormData({...editFormData, description: e.target.value})} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Dificuldade</Label>
              <select value={editFormData.difficulty || ""} onChange={(e) => setEditFormData({...editFormData, difficulty: e.target.value})} className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm">
                <option value="EASY">Fácil</option>
                <option value="MEDIUM">Médio</option>
                <option value="HARD">Difícil</option>
              </select>
            </div>

            <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Label className="text-gray-300 font-bold">Pontuação da corrida</Label>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Vale agora <span className="text-amber-400 font-bold font-mono">{editingProblem?.points}</span> de{" "}
                    <span className="font-mono">{editingProblem?.initialPoints}</span>. O valor corrente só muda
                    com os acertos dos alunos ou reiniciando a corrida.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => editingProblem && setRestartingProblem(editingProblem)}
                  className="shrink-0 gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                >
                  <RotateCcw size={14} />
                  Reiniciar corrida
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-initialPoints" className="text-gray-400 text-xs">Valor inicial</Label>
                  <Input
                    id="edit-initialPoints"
                    type="number"
                    min="0"
                    step="1"
                    value={editScoring.initialPoints}
                    onChange={(e) => setEditFormData({...editFormData, initialPoints: Number(e.target.value)})}
                    className="bg-white/5 border-white/10"
                  />
                  {scoringErrors.initialPoints && (
                    <p className="text-[11px] text-red-400 font-medium">{scoringErrors.initialPoints}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-floorPoints" className="text-gray-400 text-xs">Piso</Label>
                  <Input
                    id="edit-floorPoints"
                    type="number"
                    min="0"
                    step="1"
                    value={editScoring.floorPoints}
                    onChange={(e) => setEditFormData({...editFormData, floorPoints: Number(e.target.value)})}
                    className="bg-white/5 border-white/10"
                  />
                  {scoringErrors.floorPoints && (
                    <p className="text-[11px] text-red-400 font-medium">{scoringErrors.floorPoints}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-decrement" className="text-gray-400 text-xs">Decremento</Label>
                  <Input
                    id="edit-decrement"
                    type="number"
                    min="0"
                    step="1"
                    value={editScoring.decrement}
                    onChange={(e) => setEditFormData({...editFormData, decrement: Number(e.target.value)})}
                    className="bg-white/5 border-white/10"
                  />
                  {scoringErrors.decrement && (
                    <p className="text-[11px] text-red-400 font-medium">{scoringErrors.decrement}</p>
                  )}
                </div>
              </div>
            </div>

            {/* NOVOS CAMPOS ADICIONADOS AQUI */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-input" className="text-gray-400">Entrada (Input de teste)</Label>
                <textarea 
                  id="edit-input" 
                  rows={3}
                  value={editFormData.input || ""} 
                  onChange={(e) => setEditFormData({...editFormData, input: e.target.value})}
                  className="w-full flex min-h-[80px] font-mono rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-y" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-answer" className="text-gray-400">Saída Esperada (Answer)</Label>
                <textarea 
                  id="edit-answer" 
                  rows={3}
                  value={editFormData.answer || ""} 
                  onChange={(e) => setEditFormData({...editFormData, answer: e.target.value})}
                  className="w-full flex min-h-[80px] font-mono rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-emerald-400 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors resize-y" 
                />
              </div>
            </div>
            {/* FIM DOS NOVOS CAMPOS */}

            <DialogFooter className="pt-4 border-t border-white/10 mt-6">
              <Button type="button" variant="ghost" onClick={() => setEditingProblem(null)}>Cancelar</Button>
              <Button type="submit" disabled={actionLoading} className="bg-primary">{actionLoading ? "A guardar..." : "Guardar Alterações"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!restartingProblem} onOpenChange={(open) => !open && setRestartingProblem(null)}>
        <DialogContent className="bg-[#0a0a0b] border-amber-500/20 text-white sm:max-w-[425px]">
          <DialogHeader><DialogTitle className="text-amber-400 flex items-center gap-2"><RotateCcw size={20} /> Reiniciar Corrida</DialogTitle></DialogHeader>
          <form onSubmit={handleRestartRace} className="space-y-4 py-2">
            <p className="text-sm text-gray-400">
              O problema <strong>{restartingProblem?.title}</strong> volta a valer{" "}
              <strong className="text-amber-400 font-mono">{restartingProblem?.initialPoints}</strong> pontos
              (vale <span className="font-mono">{restartingProblem?.points}</span> agora). Quem já resolveu mantém
              os pontos que ganhou.
            </p>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setRestartingProblem(null)}>Cancelar</Button>
              <Button type="submit" disabled={actionLoading} className="bg-amber-600 hover:bg-amber-500">{actionLoading ? "A reiniciar..." : "Sim, Reiniciar"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deletingProblem} onOpenChange={(open) => !open && setDeletingProblem(null)}>
        <DialogContent className="bg-[#0a0a0b] border-red-500/20 text-white sm:max-w-[425px]">
          <DialogHeader><DialogTitle className="text-red-500 flex items-center gap-2"><AlertTriangle size={20} /> Eliminar Problema</DialogTitle></DialogHeader>
          <form onSubmit={handleDeleteProblem} className="space-y-4 py-2">
            <p className="text-sm text-gray-400">Pretende eliminar <strong>{deletingProblem?.title}</strong>? Esta ação é irreversível.</p>
            <DialogFooter><Button type="button" variant="ghost" onClick={() => setDeletingProblem(null)}>Cancelar</Button><Button type="submit" disabled={actionLoading} className="bg-red-500">{actionLoading ? "A eliminar..." : "Sim, Eliminar"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      
    </Card>
  );
}