import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface RankUser {
  rank: number;
  name: string;
  score: number;
  avatarUrl?: string;
}

interface RankingTableProps {
  data: RankUser[];
}

export function RankingTable({ data }: RankingTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="text-yellow-400" size={20} />;
      case 2: return <Medal className="text-gray-300" size={20} />;
      case 3: return <Award className="text-amber-600" size={20} />;
      default: return <span className="text-muted-foreground font-mono w-5 text-center">{rank}</span>;
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-background/40 backdrop-blur-xl shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary">Posição</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary">Usuário</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary text-right">Pontuação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((user) => (
              <tr 
                key={user.rank} 
                className={cn(
                  "transition-colors hover:bg-white/5 group",
                  user.rank <= 3 && "bg-primary/5"
                )}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                    {getRankIcon(user.rank)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-white/10">
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback className="bg-secondary text-[10px]">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className={cn(
                      "font-medium text-sm md:text-base",
                      user.rank === 1 ? "text-white" : "text-gray-300"
                    )}>
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-mono font-bold text-primary text-lg">
                    {user.score.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}