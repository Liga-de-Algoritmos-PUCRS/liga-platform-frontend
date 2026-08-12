import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";
import { cn } from "@/lib/utils"
import { PublicUserResponseDTO } from "@/api/sdk";

interface RankingTableProps {
  data: PublicUserResponseDTO[];
  // Qual pontuação a coluna mostra. O back ordena a aba mensal por
  // monthlyPoints e a geral por allTimePoints: sem escolher o campo aqui, a aba
  // mensal exibia o total de quem tivesse allTimePoints > 0.
  pointsField: "monthlyPoints" | "allTimePoints";
  onUserClick: (user: PublicUserResponseDTO) => void;
}

export function RankingTable({ data, pointsField, onUserClick }: RankingTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="text-yellow-400" size={20} />;
      case 2: return <Medal className="text-gray-300" size={20} />;
      case 3: return <Award className="text-amber-600" size={20} />;
      default: return <span className="text-muted-foreground font-mono w-5 text-center">{rank}</span>;
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-background/40 shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest color-primary">Posição</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest color-primary">Usuário</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest color-primary text-right">Pontuação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((user, index) => {
              const rank = index + 1;
              return (
                <tr 
                  key={user.id} 
                  className={cn(
                    "transition-colors hover:bg-white/5 group",
                    rank <= 3 && "bg-primary/5"
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                      {getRankIcon(rank)}
                    </div>
                  </td>
                  <td 
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => onUserClick(user)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-white/10 group-hover:border-primary/50 transition-colors">
                        <AvatarImage src={user.avatarUrl || ""}  className="object-cover"/>
                        <AvatarFallback className="bg-secondary text-[10px]">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className={cn(
                        "font-medium text-sm md:text-base group-hover:text-primary transition-colors",
                        rank === 1 ? "text-white" : "text-gray-300"
                      )}>
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-mono font-bold text-primary text-lg">
                      {(user[pointsField] ?? 0).toLocaleString()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}