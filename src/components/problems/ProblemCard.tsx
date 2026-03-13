import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, Star, CheckCircle2, Check } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { ProblemResponseDTO } from "@/api/sdk";
import { cn } from "@/lib/utils";

interface ProblemCardProps {
  problem: ProblemResponseDTO;
  isFinished?: boolean;  
  onClick?: (problem: ProblemResponseDTO) => void; 
}

export function ProblemCard({ problem, isFinished, onClick }: ProblemCardProps) {
  const navigate = useNavigate();
  const difficultyLevel = problem.difficulty || "MEDIUM";
  
  const difficultyStyles = {
    EASY: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
    MEDIUM: "text-amber-400 border-amber-400/20 bg-amber-400/10",
    HARD: "text-red-400 border-red-400/20 bg-red-400/10",
  }[difficultyLevel as "EASY" | "MEDIUM" | "HARD"];

  const handleCardClick = () => {
    if (onClick) onClick(problem);
    if (problem.id) {
      navigate({ 
        to: '/problemas/$problemId', 
        params: { problemId: problem.id.replace('#', '') } 
      });
    }
  };

  // Função para remover as tags HTML
  const cleanDescription = problem.description?.replace(/<[^>]*>?/gm, '') || '';

  return (
    <Card 
      onClick={handleCardClick}
      className={cn(
        "group relative aspect-square flex flex-col cursor-pointer overflow-hidden border-white/10 bg-[#0a0a0b]/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 rounded-[32px]",
        isFinished && "border-emerald-500/30 shadow-lg shadow-emerald-500/5"
      )}
    >
      <div className="relative h-1/2 w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-purple-900/20 to-transparent z-0" />
        
        {isFinished && (
          <div className="absolute top-5 left-6 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-tighter shadow-xl animate-in zoom-in duration-300">
            <Check size={12} strokeWidth={4} />
            CONCLUÍDO
          </div>
        )}

        {problem.bannerUrl ? (
          <img src={problem.bannerUrl} alt={problem.title} className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-10"><Terminal size={64} /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent z-10" />
        
        <div className="absolute top-5 right-6 flex items-center gap-1.5 z-20">
          <Badge className={cn("px-2.5 py-0.5 font-bold text-[9px] tracking-widest uppercase rounded-lg border shadow-lg", difficultyStyles)}>
            {problem.difficulty}
          </Badge>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-black/60 border border-white/10 text-[10px] font-bold text-primary backdrop-blur-md">
            <Star size={10} fill="currentColor" />
            {problem.points} <span className="text-[8px] opacity-50">PTS</span>
          </div>
        </div>
      </div>

      <div className="relative z-20 flex-1 flex flex-col px-6 -mt-8 pb-6">
        <div className="space-y-1.5"> 
          <h3 className={cn("text-lg sm:text-xl font-black tracking-tighter text-white transition-colors line-clamp-1", isFinished ? "group-hover:text-emerald-400" : "group-hover:text-primary")}>
            {problem.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 leading-tight font-medium opacity-90">
            {cleanDescription}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn("flex items-center gap-1.5 text-[10px] font-mono font-bold", isFinished ? "text-emerald-400" : "text-gray-500")}>
              <CheckCircle2 size={12} />
              <span>{isFinished ? "Você resolveu!" : `${problem.resolved || 0} resolvidos`}</span>
            </div>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
            <Terminal size={12} className="text-gray-600 group-hover:text-primary" />
          </div>
        </div>
      </div>
    </Card>
  );
}