import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, Star, CheckCircle2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProblemCardProps {
  problem: any;
  onClick: (problem: any) => void;
}

export function ProblemCard({ problem, onClick }: ProblemCardProps) {
  const difficultyStyles = {
    EASY: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
    MEDIUM: "text-amber-400 border-amber-400/20 bg-amber-400/10",
    HARD: "text-red-400 border-red-400/20 bg-red-400/10",
  }[problem.difficulty as "EASY" | "MEDIUM" | "HARD"];

  return (
    <Card 
      onClick={() => onClick(problem)}
      className="group relative aspect-square flex flex-col cursor-pointer overflow-hidden border-white/10 bg-[#0a0a0b]/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 rounded-[32px]"
    >
      <div className="relative h-1/2 w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-purple-900/20 to-transparent z-0" />
        {problem.bannerUrl ? (
          <img 
            src={problem.bannerUrl} 
            alt={problem.title} 
            className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Terminal size={64} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent z-10" />
        
        <div className="absolute top-5 left-6 right-6 flex items-center justify-between z-20">
          <Badge className={cn("px-2.5 py-0.5 font-bold text-[9px] tracking-widest uppercase rounded-lg border shadow-lg", difficultyStyles)}>
            {problem.difficulty}
          </Badge>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-black/60 border border-white/10 text-[10px] font-bold text-primary backdrop-blur-md shadow-lg">
            <Star size={10} fill="currentColor" />
            {problem.points} <span className="text-[8px] opacity-50">PTS</span>
          </div>
        </div>
      </div>

      <div className="relative z-20 flex-1 flex flex-col px-6 -mt-8 pb-6">
        <div className="space-y-1.5"> 
          <h3 className="text-lg sm:text-xl font-black tracking-tighter text-white group-hover:text-primary transition-colors line-clamp-1 leading-none drop-shadow-md">
            {problem.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 leading-tight font-medium opacity-90">
            {problem.description}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500/80 font-bold">
              <CheckCircle2 size={12} />
              <span>{problem.resolved} resolvidos</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-gray-500 font-bold">
              <Users size={12} />
              <span>{problem.submissions} envios</span>
            </div>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 group-hover:border-primary/30 transition-all">
            <Terminal size={12} className="text-gray-600 group-hover:text-primary" />
          </div>
        </div>
      </div>
    </Card>
  );
}