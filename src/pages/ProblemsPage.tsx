import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProblemCard } from "@/components/problems/ProblemCard";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"
import { 
  Search, Sparkles, Filter, Terminal, Hash, Trophy, BarChart3,
  X, Loader2, CheckCircle2, Circle, HelpCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import client from "@/api/client";
import { ProblemResponseDTO, SubmitResponseDTO } from "@/api/sdk";
import { useAuth } from "@/providers/AuthProvider";

import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

export function ProblemsPage() {
  const [, setSelectedProblem] = useState<ProblemResponseDTO | null>(null);
  const { user, isAuthenticated } = useAuth();
  
  const [nameFilter, setNameFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "DONE" | "PENDING">("ALL");
  const [minPoints, setMinPoints] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  // 1. Busca de Problemas com React Query
  const { data: problemsResponse, isLoading: isLoadingProblems } = useQuery({
    queryKey: ['problems'],
    queryFn: () => client.problem.problemControllerGetAllProblems(),
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
  });

  // 2. Busca das Submissões do Usuário (SÓ executa se o usuário estiver logado)
  const { data: submissionsResponse, isLoading: isLoadingSubmissions } = useQuery({
    queryKey: ['submissions', user?.id],
    queryFn: () => client.submit.submitControllerGetSubmitByUserId(String(user?.id)),
    enabled: !!(isAuthenticated && user?.id),
    staleTime: 1000 * 60 * 2, // Cache de 2 minutos
  });

  const problems = (problemsResponse?.data as ProblemResponseDTO[]) || [];
  const isLoading = isLoadingProblems || (isAuthenticated && isLoadingSubmissions);

  // Deriva o Set de concluídos direto dos dados cacheados
  const userFinishedIds = useMemo(() => {
    if (!submissionsResponse?.data) return new Set<string>();
    const finished = (submissionsResponse.data as SubmitResponseDTO[])
      .filter(s => s.isFinished)
      .map(s => s.problemId);
    return new Set(finished as string[]);
  }, [submissionsResponse?.data]);

  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      const title = p.title || "";
      const id = p.id || "";
      const diff = p.difficulty || "MEDIUM";
      const pts = p.points || 0;
      const isDone = userFinishedIds.has(id);

      const matchesName = title.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesId = id.toLowerCase().includes(idFilter.toLowerCase()) || 
                        id.toLowerCase().includes(`#${idFilter.toLowerCase()}`);
      const matchesDifficulty = difficultyFilter === "ALL" || diff === difficultyFilter;
      const matchesPoints = pts >= minPoints;
      const matchesStatus = 
        statusFilter === "ALL" || 
        (statusFilter === "DONE" && isDone) || 
        (statusFilter === "PENDING" && !isDone);

      return matchesName && matchesId && matchesDifficulty && matchesPoints && matchesStatus;
    });
  }, [problems, nameFilter, idFilter, difficultyFilter, minPoints, statusFilter, userFinishedIds]);

  const clearFilters = () => {
    setNameFilter("");
    setIdFilter("");
    setDifficultyFilter("ALL");
    setStatusFilter("ALL");
    setMinPoints(0);
  };

  const fixedProblems = filteredProblems.filter((p) => p.fixed);
  const regularProblems = filteredProblems.filter((p) => !p.fixed);

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] md:w-[95%] h-[95%] bg-primary/15 blur-[100px] md:blur-[200px] rounded-full animate-pulse z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        <div className="absolute right-0 top-0 md:top-2 md:right-2 z-20">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-all shadow-sm border border-transparent hover:border-primary/20"
                title="Como funciona?"
              >
                <HelpCircle size={22} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-md border-white/10">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-fuchsia-600 uppercase tracking-tight">
                  Como Funciona?
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Guia rápido de como utilizar a Liga de Algoritmos.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-5 py-4 text-sm text-gray-300">
                <div className="flex gap-4 items-start">
                  <Terminal className="text-primary mt-0.5 shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold text-white">Desafios de Código</h4>
                    <p className="text-gray-400 mt-1 leading-relaxed">Explore nossa biblioteca de problemas. Eles variam em dificuldade (EASY, MEDIUM, HARD) e pontuação.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Filter className="text-primary mt-0.5 shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold text-white">Filtros Inteligentes</h4>
                    <p className="text-gray-400 mt-1 leading-relaxed">Use a barra de busca e os filtros avançados para encontrar o desafio ideal com base no seu nível e status atual.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Trophy className="text-primary mt-0.5 shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold text-white">Pontuação e Ranking</h4>
                    <p className="text-gray-400 mt-1 leading-relaxed">Resolva os algoritmos, submeta o seu código e acumule pontos para subir posições no ranking geral da plataforma.</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col items-center text-center mb-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold text-primary tracking-widest uppercase shadow-xl">
            <Sparkles size={12} className="animate-spin-slow" />
            <span>Biblioteca de Algoritmos</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-fuchsia-600 leading-none uppercase">
            PROBLEMAS
          </h1>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Nome do problema..." 
                className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus-visible:ring-primary shadow-2xl"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>

            <div className="relative w-full md:w-48">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60" size={16} />
              <Input 
                placeholder="ID..." 
                className="pl-10 h-14 bg-white/5 border-white/10 rounded-2xl focus-visible:ring-primary font-mono text-sm"
                value={idFilter}
                onChange={(e) => setIdFilter(e.target.value)}
              />
            </div>

            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters ? "default" : "secondary"}
              className="h-14 px-6 rounded-2xl gap-2 font-bold w-full md:w-auto transition-all"
            >
              {showFilters ? <X size={18} /> : <Filter size={18} />}
              Filtros Avançados
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 animate-in slide-in-from-top-4 duration-300">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                  <BarChart3 size={12} />
                  Dificuldade
                </div>
                <div className="flex gap-2">
                  {["ALL", "EASY", "MEDIUM", "HARD"].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={cn(
                        "flex-1 py-2 text-[10px] font-black rounded-xl border transition-all uppercase",
                        difficultyFilter === diff 
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                          : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                      )}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                  <CheckCircle2 size={12} />
                  Status
                </div>
                <div className="flex gap-2">
                  {[
                    { id: "ALL", label: "Todos", icon: null },
                    { id: "DONE", label: "Feitos", icon: CheckCircle2 },
                    { id: "PENDING", label: "Pendentes", icon: Circle }
                  ].map((status) => (
                    <button
                      key={status.id}
                      onClick={() => setStatusFilter(status.id as "ALL" | "DONE" | "PENDING")}
                      className={cn(
                        "flex-1 py-2 text-[10px] font-black rounded-xl border transition-all uppercase flex items-center justify-center gap-1.5",
                        statusFilter === status.id 
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                          : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                      )}
                    >
                      {status.icon && <status.icon size={12} />}
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                  <Trophy size={12} />
                  Mínimo de Pontos: <span className="text-primary">{minPoints}</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="500"
                  step="50"
                  value={minPoints}
                  onChange={(e) => setMinPoints(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="flex items-end lg:col-span-3">
                <Button 
                  onClick={clearFilters}
                  variant="ghost" 
                  className="w-full h-11 text-[10px] font-bold uppercase tracking-widest hover:text-white"
                >
                  Limpar todos os filtros
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-6 px-2">
          <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-md">
            {filteredProblems.length}
          </span>
          <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
            Desafios Encontrados
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 size={48} className="animate-spin text-primary mb-4" />
            <h3 className="text-xl font-bold text-white uppercase tracking-widest">A carregar desafios...</h3>
          </div>
        ) : (
          <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Seção: Problemas Fixados (Destaques) */}
            {fixedProblems.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <Sparkles className="text-primary" size={24} />
                  <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Em Destaque</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {fixedProblems.map((problem) => (
                    <ProblemCard 
                      key={problem.id} 
                      problem={problem} 
                      isFinished={userFinishedIds.has(problem.id || "")}
                      onClick={setSelectedProblem} 
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Seção: Outros Problemas */}
            {regularProblems.length > 0 && (
              <div className="space-y-6">
                {fixedProblems.length > 0 && (
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <Terminal className="text-gray-400" size={24} />
                    <h2 className="text-2xl font-black text-gray-200 tracking-tighter uppercase">Outros Problemas</h2>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {regularProblems.map((problem) => (
                    <ProblemCard 
                      key={problem.id} 
                      problem={problem} 
                      isFinished={userFinishedIds.has(problem.id || "")}
                      onClick={setSelectedProblem} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!isLoading && filteredProblems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="p-6 rounded-full bg-white/5 border border-white/10 mb-6">
              <Terminal size={48} className="text-gray-700" />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Nenhum algoritmo encontrado</h3>
            <p className="text-gray-500 mt-2 text-sm">Tente ajustar seus filtros para encontrar outros desafios.</p>
            <Button onClick={clearFilters} variant="link" className="text-primary mt-4 font-bold">
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgb(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
    </div>
  );
}