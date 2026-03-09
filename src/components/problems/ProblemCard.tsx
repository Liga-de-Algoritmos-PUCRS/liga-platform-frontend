import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, Star, CheckCircle2 } from "lucide-react";
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
      className="group relative aspect-square flex flex-col cursor-pointer overflow-hidden border-white/10 bg-background/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20"
    >
      <CardHeader className="p-5 pb-2">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className={cn("text-[9px] font-bold uppercase tracking-tighter", difficultyStyles)}>
            {problem.difficulty}
          </Badge>
          <div className="flex items-center gap-1 text-[10px] font-bold text-primary">
            <Star size={12} fill="currentColor" />
            {problem.points}
          </div>
        </div>
        <CardTitle className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors line-clamp-2">
          {problem.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-5 pt-2 flex flex-col justify-between">
        <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 leading-relaxed">
          {problem.description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={12} className="text-emerald-500/60" />
            <span>{problem.resolved} resoluções</span>
          </div>
          <Terminal size={14} className="opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all" />
        </div>
      </CardContent>
    </Card>
  );
}