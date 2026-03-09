import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  ChevronRight, 
  Code2, 
  Cpu,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProblemDetailsModalProps {
  problem: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProblemDetailsModal({ problem, isOpen, onClose }: ProblemDetailsModalProps) {
  if (!problem) return null;

  const difficultyStyles = {
    EASY: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
    MEDIUM: "text-amber-400 border-amber-400/20 bg-amber-400/10",
    HARD: "text-red-400 border-red-400/20 bg-red-400/10",
  }[problem.difficulty as "EASY" | "MEDIUM" | "HARD"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-[600px] p-0 overflow-hidden border-white/10 bg-[#0a0a0b]/95 backdrop-blur-3xl text-white shadow-2xl shadow-primary/20 outline-none rounded-3xl">
        
        {/* Header com Banner Curto */}
        <div className="relative h-24 w-full">
          <div className={cn("absolute inset-0 opacity-40 bg-gradient-to-br from-primary/60 to-background")} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
          
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
             <Badge className={cn("px-3 py-1 font-bold text-[10px] tracking-widest uppercase", difficultyStyles)}>
                {problem.difficulty}
             </Badge>
             <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs font-bold text-primary">
                <Star size={12} fill="currentColor" />
                {problem.points} pts
             </div>
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-8">
          <div className="flex flex-col gap-6">
            
            {/* Título e Descrição */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-white mb-3">
                {problem.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {problem.description}
              </p>
            </div>

            {/* Grid de Specs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Code2 size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Input</span>
                </div>
                <p className="text-sm font-mono text-gray-300">{problem.input || "Nenhum input específico"}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <Target size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Stats</span>
                </div>
                <p className="text-sm font-mono text-gray-300">{problem.resolved} Resolvidos</p>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button className="flex-1 h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold gap-2">
                Começar Code Editor
                <ChevronRight size={18} />
              </Button>
              <Button variant="outline" className="h-12 rounded-2xl border-white/10 hover:bg-white/5 text-gray-300">
                Ver Documentação
              </Button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="py-3 bg-white/[0.02] text-center border-t border-white/5">
          <div className="flex items-center justify-center gap-2 text-[9px] text-gray-600 font-mono font-bold uppercase tracking-[0.2em]">
            <Cpu size={12} />
            Desafio Técnico Liga de Algoritmos
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}