import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { 
   Download, Send, FileText, 
  Users, Trophy, Activity, CheckCircle2, ArrowLeft, Loader2, Eye, EyeOff,
  XCircle, PartyPopper, CheckCircle, Hash
} from "lucide-react";
import { Link, useParams, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/providers/AuthProvider";
import client from "@/api/client";
import { ProblemResponseDTO, SubmitResponseDTO } from "@/api/sdk";
import ReactMarkdown from "react-markdown";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export function ProblemDetailsPage() {
  const { problemId } = useParams({ strict: false });
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'ROOT';

  const [problem, setProblem] = useState<ProblemResponseDTO & { isFinished?: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchProblemData() {
      const cleanId = problemId?.replace('%23', '').replace('#', ''); 
      if (!cleanId) return;
      
      setIsLoading(true);

      try {
        let problemResponse;
        if (isAdmin) {
          problemResponse = await client.problem.problemControllerGetAdminProblemById(cleanId);
        } else {
          problemResponse = await client.problem.problemControllerGetProblemById(cleanId);
        }

        let finished = false;

        if (isAuthenticated && user?.id) {
          try {
            const submitsResponse = await client.submit.submitControllerGetSubmitByUserId(String(user.id));
            const submissoes = submitsResponse.data as SubmitResponseDTO[];
            finished = submissoes.some(
              (s) => s.problemId === cleanId && s.isFinished === true
            );
          } catch (e) {
            console.error("Erro ao validar submissões prévias:", e);
          }
        }

        if (isMounted) {
          setProblem({
            ...(problemResponse.data as ProblemResponseDTO),
            isFinished: finished
          });
        }
      } catch (error: unknown) {
        console.error("Erro ao buscar detalhes do problema:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchProblemData();
    return () => { isMounted = false; };
  }, [problemId, isAdmin, isAuthenticated, user?.id]);

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center text-primary bg-[#0a0a0b]">
        <Loader2 size={48} className="animate-spin mb-4" />
        <h2 className="text-xl font-bold font-mono tracking-tighter uppercase">Sincronizando Dados...</h2>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center text-white bg-[#0a0a0b]">
        <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">Problema não encontrado</h1>
        <Link to="/problemas">
          <Button variant="outline" className="text-black font-bold rounded-xl">Voltar para Biblioteca</Button>
        </Link>
      </div>
    );
  }

  const difficultyStyles: Record<string, string> = {
    EASY: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
    MEDIUM: "text-amber-400 border-amber-400/20 bg-amber-400/10",
    HARD: "text-red-400 border-red-400/20 bg-red-400/10",
  };

  const problemDifficulty = problem.difficulty || "MEDIUM";
  const currentDiffStyle = difficultyStyles[problemDifficulty] || difficultyStyles.MEDIUM;

  const formatDescription = (text: string) => {
    return text.replace(/<[^>]*>?/gm, '');
  };

  const handleDownloadInput = () => {
    if (!problem.input) return;
    const blob = new Blob([String(problem.input)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${problem.title?.toLowerCase().replace(/\s+/g, "_") || 'problem'}_input.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async () => {
    if (!problem.id || !userAnswer) return;

    setIsSubmitting(true);
    try {
      const response = await client.submit.submitControllerCreateSubmit({
        problemId: problem.id,
        answer: userAnswer
      });

      const { isFinished, pointsEarned } = response.data;

      if (isFinished) {
        setEarnedPoints(pointsEarned || 0);
        setShowSuccessModal(true);
        setUserAnswer(""); 
        setProblem(prev => prev ? { ...prev, isFinished: true } : null);
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Erro ao submeter resposta:", error);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 bg-[#0a0a0b] text-white flex flex-col lg:flex-row h-screen overflow-hidden">
      
      {/* Lado Esquerdo - Detalhes e Instruções */}
      <div className="flex-1 flex flex-col border-r border-white/5 overflow-hidden">
        
        {/* Banner Fixo */}
        <div className="relative h-60 w-full overflow-hidden shrink-0">
          <Link to="/problemas" className="absolute top-6 left-6 z-30">
            <Button variant="ghost" size="icon" className="bg-black/50 hover:bg-black/80 rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-900/20 to-transparent z-0" />
          {problem.bannerUrl && (
            <img src={problem.bannerUrl} alt={problem.title} className="h-full w-full object-cover mix-blend-overlay opacity-90" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent z-10" />
          
          <div className="absolute bottom-6 left-10 z-20 space-y-2">
            <div className="flex items-center gap-3">
               <Badge className={cn("px-4 py-1.5 font-bold text-[10px] tracking-widest uppercase rounded-xl border-2 shadow-lg", currentDiffStyle)}>
                  {problemDifficulty}
               </Badge>
               <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-primary/20 border border-primary/30 text-sm font-bold text-white backdrop-blur-md">
                  <Trophy size={14} className="text-primary" />
                  {problem.points} <span className="text-[10px] opacity-60 ml-0.5">PONTOS</span>
               </div>
               {problem.isFinished && (
                 <Badge className="px-4 py-1.5 font-bold text-[10px] tracking-widest uppercase rounded-xl border-2 border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-lg animate-in zoom-in duration-300">
                   <CheckCircle size={12} className="mr-1.5" />
                   Resolvido
                 </Badge>
               )}
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase">{problem.title}</h2>
          </div>
        </div>

        {/* Conteúdo Esquerdo com GAP e Scroll Apenas na Descrição */}
        <div className="flex-1 flex flex-col p-10 gap-8 overflow-hidden">
          
          {/* Cabeçalho de Instruções (FIXO) */}
          <div className="flex items-center gap-3 text-primary/80 border-b border-white/5 pb-4 shrink-0">
            <FileText size={20} />
            <h3 className="font-bold uppercase tracking-[0.2em] text-xs">Instruções do Desafio</h3>
          </div>

          {/* Área de Scroll apenas para o Texto */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
            <div className="prose prose-invert max-w-none pb-10">
              <div className="text-lg text-gray-400 leading-relaxed font-medium">
                <ReactMarkdown>
                  {formatDescription(problem.description || "")}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito - Sidebar */}
      <div className="w-full lg:w-[400px] bg-white/[0.01] p-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar shrink-0 h-full">
        
        {/* Recursos de Entrada */}
        <div className="space-y-3">
          <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Recursos de Entrada</Label>
          <div className="p-4 rounded-[24px] bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:border-primary/40 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Download size={22} />
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Input.txt</p>
            </div>
            <Button onClick={handleDownloadInput} size="sm" className="rounded-xl h-10 px-4 bg-primary transition-all text-white font-bold text-xs">Baixar</Button>
          </div>
        </div>

        {/* Taxa de Acerto */}
        <div className="space-y-3">
          <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Taxa de Acerto</Label>
          <div className="p-6 rounded-[32px] bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Activity size={16} className="text-emerald-400" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Taxa de Acerto</span>
              </div>
              <span className={cn("text-2xl font-black font-mono tracking-tighter", (problem.resolved || 0) > 0 ? "text-emerald-400" : "text-amber-400")}>
                {problem.submissions ? Math.round(((problem.resolved || 0) / problem.submissions) * 100) : 0}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-1.5"><Users size={10} /> Submits</p>
                <p className="text-sm font-black text-white font-mono">{problem.submissions || 0}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-1.5"><CheckCircle2 size={10} /> Resolvidos</p>
                <p className="text-sm font-black text-white font-mono">{problem.resolved || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Identificador (Engordado/Mais alto) */}
        <div className="space-y-3">
          <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Identificador</Label>
          <div className="px-6 py-5 rounded-[24px] bg-white/[0.02] border border-white/5 flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/5">
                <Hash size={18} className="text-primary/60" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-widest">Problem ID</span>
                <span className="text-sm font-mono font-black text-primary tracking-wider">#{problem.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Área de Ação (Empurrada para o final) */}
        <div className="mt-auto pt-6 space-y-4">
          {!isAuthenticated ? (
             <Button onClick={() => navigate({ to: '/login' })} className="w-full h-16 rounded-[24px] bg-primary/20 hover:bg-primary border border-primary/50 text-white font-bold">Faça Login para Enviar</Button>
          ) : problem.isFinished ? (
            <div className="p-6 rounded-[32px] border-2 border-emerald-500/20 bg-emerald-500/5 flex flex-col items-center text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <CheckCircle size={28} />
              </div>
              <h4 className="text-base font-black text-white uppercase tracking-tight">Desafio Resolvido</h4>
              <Button onClick={() => navigate({ to: '/problemas' })} variant="outline" className="w-full rounded-2xl border-white/10 hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest h-12">Próximo Desafio</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Sua Resposta</Label>
                <Input value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="Digite seu output..." className="h-14 bg-[#0a0a0b] border-white/10 rounded-[20px] text-sm font-mono px-6" disabled={isSubmitting} />
              </div>
              <Button onClick={handleSubmit} disabled={!userAnswer || isSubmitting} className="w-full h-14 rounded-[24px] bg-primary hover:bg-primary/90 text-white font-black text-base gap-3 shadow-lg shadow-primary/20">
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <>ENVIAR RESPOSTA <Send size={18} /></>}
              </Button>
            </div>
          )}

          {isAdmin && problem.answer && (
            <div className="pt-2 border-t border-white/10 space-y-2">
              <Button variant="ghost" onClick={() => setShowAnswer(!showAnswer)} className="w-full h-8 text-gray-500 hover:text-white text-[9px] font-bold gap-2">
                {showAnswer ? <EyeOff size={12} /> : <Eye size={12} />} {showAnswer ? "Esconder Resposta" : "Ver Resposta (Admin)"}
              </Button>
              {showAnswer && (
                <div className="p-3 rounded-xl bg-black/50 border border-red-500/30 overflow-x-auto max-h-24">
                  <p className="text-[9px] font-mono text-red-400 font-bold whitespace-pre-wrap">{problem.answer}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modais de Feedback */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-[#0a0a0b] border-emerald-500/30 text-white max-w-sm rounded-[32px]">
          <DialogHeader className="flex flex-col items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-2xl shadow-emerald-500/20">
              <PartyPopper size={40} />
            </div>
            <DialogTitle className="text-2xl font-black tracking-tighter text-emerald-400">RESPOSTA CORRETA!</DialogTitle>
            <DialogDescription className="text-center text-gray-400 font-medium">
              Excelente trabalho! Você conquistou <span className="text-primary font-bold">{earnedPoints} pontos</span> para o ranking da Liga.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button onClick={() => setShowSuccessModal(false)} className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-bold">Uhuul!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent className="bg-[#0a0a0b] border-red-500/30 text-white max-w-sm rounded-[32px]">
          <DialogHeader className="flex flex-col items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shadow-2xl shadow-red-500/20">
              <XCircle size={40} />
            </div>
            <DialogTitle className="text-2xl font-black tracking-tighter text-red-400">OPS, ESTÁ ERRADO...</DialogTitle>
            <DialogDescription className="text-center text-gray-400 font-medium">A resposta enviada não coincide com o output esperado.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button onClick={() => setShowErrorModal(false)} className="w-full rounded-2xl bg-red-600 hover:bg-red-500 font-bold">Tentar de Novo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}