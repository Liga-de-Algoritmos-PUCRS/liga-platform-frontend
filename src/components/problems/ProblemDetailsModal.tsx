import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Terminal, 
  Download, 
  Send,
  Cpu,
  FileText,
  Clock,
  Users,
  Trophy,
  Activity,
  CheckCircle2,
  Hash
} from "lucide-react";
import { cn } from "@/lib/utils";

const formatDate = (date?: Date | string) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

interface ProblemDetailsModalProps {
  problem: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProblemDetailsModal({ problem, isOpen, onClose }: ProblemDetailsModalProps) {
  const [userAnswer, setUserAnswer] = useState("");

  if (!problem) return null;

  const difficultyStyles = {
    EASY: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
    MEDIUM: "text-amber-400 border-amber-400/20 bg-amber-400/10",
    HARD: "text-red-400 border-red-400/20 bg-red-400/10",
  }[problem.difficulty as "EASY" | "MEDIUM" | "HARD"];

  const successRate = problem.submissions > 0 
    ? Math.round((problem.resolved / problem.submissions) * 100) 
    : 0;

  const handleDownloadInput = () => {
    if (!problem.input) return;
    const blob = new Blob([problem.input], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${problem.title.toLowerCase().replace(/\s+/g, "_")}_input.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[98vw] sm:max-w-5xl p-0 overflow-hidden border-white/10 bg-[#0a0a0b]/98 backdrop-blur-3xl text-white shadow-2xl shadow-primary/20 outline-none rounded-[40px]">
        
        <div className="flex flex-col lg:flex-row h-full lg:min-h-[750px]">
          
          <div className="flex-1 flex flex-col border-r border-white/5 overflow-hidden">
            <div className="relative h-60 w-full overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-900/20 to-transparent z-0" />
              {problem.bannerUrl ? (
                <img 
                  src={problem.bannerUrl} 
                  alt={problem.title} 
                  className="h-full w-full object-cover mix-blend-overlay opacity-90"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <Terminal size={180} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent z-10" />
              
              <div className="absolute bottom-6 left-10 z-20 space-y-2">
                <div className="flex items-center gap-3">
                   <Badge className={cn("px-4 py-1.5 font-bold text-[10px] tracking-widest uppercase rounded-xl border-2 shadow-lg", difficultyStyles)}>
                      {problem.difficulty}
                   </Badge>
                   <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-primary/20 border border-primary/30 text-sm font-bold text-white backdrop-blur-md">
                      <Trophy size={14} className="text-primary" />
                      {problem.points} <span className="text-[10px] opacity-60 ml-0.5">PONTOS</span>
                   </div>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white">
                  {problem.title}
                </h2>
              </div>
            </div>

            <div className="flex-1 px-10 py-8 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary/80 border-b border-white/5 pb-4">
                  <FileText size={20} />
                  <h3 className="font-bold uppercase tracking-[0.2em] text-xs">Instruções do Desafio</h3>
                </div>
                <div className="prose prose-invert max-w-none pb-10">
                  <p className="text-lg text-gray-400 leading-relaxed font-medium whitespace-pre-wrap">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-10 py-5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4 text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                <Clock size={14} className="text-primary/60" />
                <span>Última revisão: <span className="text-gray-300">{formatDate(problem.updatedAt)}</span></span>
              </div>
              <div className="flex items-center gap-2 opacity-30 select-none">
                <Cpu size={16} />
                <span className="text-[10px] font-bold tracking-[0.3em]">LIGA_ENGINE</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[400px] bg-white/[0.01] p-8 sm:p-10 flex flex-col gap-7 overflow-y-auto lg:overflow-visible">
            
            <div className="space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Recursos de Entrada</Label>
              <div className="p-5 rounded-[32px] bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:border-primary/40 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Download size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Input</p>
                    <p className="text-[10px] text-gray-500 font-mono">input.txt</p>
                  </div>
                </div>
                <Button 
                  onClick={handleDownloadInput}
                  size="sm"
                  className="rounded-xl h-10 px-4 bg-white/5 hover:bg-primary transition-all font-bold text-xs"
                >
                  Baixar
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Taxa de Acerto</Label>
              <div className="p-6 rounded-[32px] bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Activity size={16} />
                    </div>
                    <span className="text-xs font-bold text-gray-300 uppercase">Performance</span>
                  </div>
                  <span className={cn("text-2xl font-black font-mono tracking-tighter", successRate > 50 ? "text-emerald-400" : "text-amber-400")}>
                    {successRate}%
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-1.5">
                      <Users size={10} /> Submits
                    </p>
                    <p className="text-sm font-black text-white font-mono">{problem.submissions || 0}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={10} /> Resolvidos
                    </p>
                    <p className="text-sm font-black text-white font-mono">{problem.resolved || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Identificador</Label>
              <div className="px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group">
                <div className="flex items-center gap-2.5">
                  <Hash size={14} className="text-primary/60" />
                  <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-widest">Problem ID</span>
                </div>
                <span className="text-xs font-mono font-black text-primary tracking-wider group-hover:text-primary/80 transition-colors">
                  #ANDOAOSBF
                </span>
              </div>
            </div>

            <div className="lg:mt-auto space-y-6 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Submeter Resposta</Label>
                  <span className="text-[9px] text-gray-600 font-mono italic">Apenas Texto</span>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-purple-500/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                  <Input 
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Digite seu output final..." 
                    className="relative pl-6 h-16 bg-[#0a0a0b] border-white/10 rounded-2xl focus-visible:ring-primary text-sm font-mono placeholder:text-gray-800"
                  />
                </div>
              </div>

              <Button 
                disabled={!userAnswer}
                className="w-full h-16 rounded-[24px] bg-primary hover:bg-primary/90 text-white font-black text-lg gap-3 shadow-2xl shadow-primary/30 transition-all disabled:opacity-20 group"
              >
                ENVIAR RESPOSTA
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}