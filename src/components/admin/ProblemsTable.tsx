import { useState, useEffect, useCallback } from "react";
import { RefreshCcw, Edit2, Trash2, Eye, AlertTriangle, Search, FileCode2, Star, ImageOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import client from "@/api/client";
import { ProblemResponseDTO, UpdateProblemDTO } from "@/api/sdk";

// Importação do nosso novo modal de criação
import { CreateProblemModal } from "@/components/admin/CreateProblemModal";

export function ProblemsTable() {
  const [problems, setProblems] = useState<ProblemResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para controlar o Modal de Criação
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Estados para os Modais de Edição e Eliminação
  const [editingProblem, setEditingProblem] = useState<ProblemResponseDTO | null>(null);
  const [deletingProblem, setDeletingProblem] = useState<ProblemResponseDTO | null>(null);
  
  const [editFormData, setEditFormData] = useState<UpdateProblemDTO>({});
  const [actionLoading, setActionLoading] = useState(false);

  // Função para buscar todos os problemas
  const fetchProblems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await client.problem.problemControllerGetAllProblems();
      const sortedProblems = response.data.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setProblems(sortedProblems);
    } catch (error) {
      console.error("Erro ao buscar problemas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

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
      await fetchProblems(); 
    } catch (error) {
      console.error("Erro ao eliminar problema:", error);
      alert("Falha ao eliminar problema.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateProblem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProblem) return;

    setActionLoading(true);
    try {
      const payload: UpdateProblemDTO = {
        title: editFormData.title,
        description: editFormData.description,
        difficulty: editFormData.difficulty,
        answer: editFormData.answer,
        input: editFormData.input,
        points: editFormData.points
      };

      if (editFormData.bannerUrl === "") {
        payload.bannerUrl = "";
      }

      await client.problem.problemControllerUpdateProblem(editingProblem.id, payload);
      setEditingProblem(null);
      await fetchProblems(); 
    } catch (error) {
      console.error("Erro ao atualizar problema:", error);
      alert("Falha ao atualizar problema.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleArchive = (problemTitle: string) => {
    alert(`A funcionalidade de arquivar o problema "${problemTitle}" requer a adição da propriedade 'isArchived' no Backend/SDK.`);
  };

  return (
    <Card className="bg-background/50 border-white/10 text-white shadow-xl py-4">
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
              type="text"
              placeholder="Pesquisar problema..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white focus-visible:ring-primary w-full"
            />
          </div>
          <button 
            onClick={fetchProblems}
            disabled={loading}
            className="flex items-center justify-center p-2.5 sm:px-4 sm:py-2 bg-secondary/40 hover:bg-secondary/80 border border-white/5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 shrink-0"
            title="Atualizar lista"
          >
            <RefreshCcw size={16} className={cn(loading && "animate-spin", "sm:mr-2")} />
            <span className="hidden sm:inline">Atualizar</span>
          </button>
          
          {/* Botão que abre o modal de criação */}
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
                  <th className="w-[15%] px-6 py-4 font-semibold tracking-wider text-right">Ações</th>
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
                ) : filteredProblems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      {searchTerm ? "Nenhum problema encontrado com esta pesquisa." : "Nenhum problema registado."}
                    </td>
                  </tr>
                ) : (
                  filteredProblems.map((problem) => (
                    <tr key={problem.id} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col truncate">
                          <span className="font-semibold text-gray-200 truncate" title={problem.title}>
                            {problem.title}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono uppercase mt-0.5">
                            Dificuldade: {problem.difficulty}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-gray-300">
                        {problem.submissions || 0}
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-emerald-400 font-bold">
                        {problem.resolved || 0}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1.5 text-amber-400 font-mono font-bold">
                          <Star size={14} className="fill-amber-400/20" />
                          {problem.points || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-400 text-xs font-mono">
                        {new Date(problem.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit', month: '2-digit', year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => {
                              setEditingProblem(problem);
                              setEditFormData({
                                title: problem.title,
                                description: problem.description,
                                difficulty: problem.difficulty,
                                answer: problem.answer,
                                input: problem.input,
                                points: problem.points,
                                bannerUrl: problem.bannerUrl || undefined
                              });
                            }}
                            className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-primary rounded-md transition-colors border border-white/5"
                            title="Editar Problema"
                          >
                            <Edit2 size={16} />
                          </button>
                          
                          <button 
                            onClick={() => handleToggleArchive(problem.title)}
                            className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-amber-400 rounded-md transition-colors border border-white/5"
                            title="Arquivar / Ocultar Problema"
                          >
                            <Eye size={16} />
                          </button>

                          <button 
                            onClick={() => setDeletingProblem(problem)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-md transition-colors border border-red-500/20"
                            title="Eliminar Problema"
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
        </div>
      </CardContent>

      {/* MODAL DE CRIAÇÃO (Novo!) */}
      <CreateProblemModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={fetchProblems}
      />

      {/* MODAL DE EDIÇÃO EXPANDIDO */}
      <Dialog open={!!editingProblem} onOpenChange={(open) => !open && setEditingProblem(null)}>
        <DialogContent className="bg-[#0a0a0b] border-white/10 text-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Problema</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateProblem} className="space-y-5 py-4">
            
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-400">Título do Problema</Label>
              <Input 
                id="title" 
                value={editFormData.title || ""} 
                onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                className="bg-white/5 border-white/10 text-white focus-visible:ring-primary" 
              />
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-400">Descrição (Markdown/Texto)</Label>
              <textarea 
                id="description" 
                rows={4}
                value={editFormData.description || ""} 
                onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                className="w-full flex min-h-[100px] rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-y" 
              />
            </div>
            
            {/* Dificuldade e Pontos */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-gray-400">Dificuldade</Label>
                <select
                  id="difficulty"
                  value={editFormData.difficulty || ""}
                  onChange={(e) => setEditFormData({...editFormData, difficulty: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="EASY" className="bg-[#0a0a0b] text-emerald-400">EASY</option>
                  <option value="MEDIUM" className="bg-[#0a0a0b] text-amber-400">MEDIUM</option>
                  <option value="HARD" className="bg-[#0a0a0b] text-red-400">HARD</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="points" className="text-gray-400">Pontuação</Label>
                <Input 
                  id="points" 
                  type="number"
                  value={editFormData.points || 0} 
                  onChange={(e) => setEditFormData({...editFormData, points: Number(e.target.value)})}
                  className="bg-white/5 border-white/10 text-white focus-visible:ring-primary" 
                />
              </div>
            </div>

            {/* Entrada (Input) e Saída Esperada (Answer) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="input" className="text-gray-400">Entrada (Input de teste)</Label>
                <textarea 
                  id="input" 
                  rows={3}
                  value={editFormData.input || ""} 
                  onChange={(e) => setEditFormData({...editFormData, input: e.target.value})}
                  placeholder="Ex: 2\n5 10"
                  className="w-full flex min-h-[80px] font-mono rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-y" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer" className="text-gray-400">Saída Esperada (Answer)</Label>
                <textarea 
                  id="answer" 
                  rows={3}
                  value={editFormData.answer || ""} 
                  onChange={(e) => setEditFormData({...editFormData, answer: e.target.value})}
                  placeholder="Ex: 15"
                  className="w-full flex min-h-[80px] font-mono rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-emerald-400 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors resize-y" 
                />
              </div>
            </div>

            {/* Moderação de Imagem/Capa */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <Label className="text-gray-400">Imagem de Capa (Banner)</Label>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  disabled={!editFormData.bannerUrl && editFormData.bannerUrl !== ""} 
                  onClick={() => setEditFormData({...editFormData, bannerUrl: ""})}
                  className="w-full bg-white/5 border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 disabled:opacity-30"
                >
                  <ImageOff size={14} className="mr-2" /> Remover Capa do Problema
                </Button>
              </div>
            </div>

            <DialogFooter className="pt-4 border-t border-white/10 mt-6">
              <Button type="button" variant="ghost" onClick={() => setEditingProblem(null)} className="hover:bg-white/10 text-gray-300">
                Cancelar
              </Button>
              <Button type="submit" disabled={actionLoading} className="bg-primary text-white hover:bg-primary/90">
                {actionLoading ? "A guardar..." : "Guardar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL DE ELIMINAÇÃO */}
      <Dialog open={!!deletingProblem} onOpenChange={(open) => !open && setDeletingProblem(null)}>
        <DialogContent className="bg-[#0a0a0b] border-red-500/20 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle size={20} />
              Eliminar Problema
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDeleteProblem} className="space-y-4 py-2">
            <p className="text-sm text-gray-400">
              Tem a certeza de que pretende eliminar o problema <strong className="text-white">{deletingProblem?.title}</strong>? Esta ação removerá todas as submissões atreladas a ele e é irreversível.
            </p>
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setDeletingProblem(null)} className="hover:bg-white/10 text-gray-300">
                Cancelar
              </Button>
              <Button type="submit" disabled={actionLoading} className="bg-red-500 text-white hover:bg-red-600">
                {actionLoading ? "A eliminar..." : "Sim, Eliminar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}