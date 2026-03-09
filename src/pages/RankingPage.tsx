import { useState } from "react";
import { RankingTable } from "@/components/ranking/RankingTable";
import { UserInfoModal } from "@/components/ranking/UserInfoModal";
import { Button } from "@/components/ui/button";
import { Calendar, Globe2, Trophy, Sparkles } from "lucide-react";
import UserWithAccount from "@/types/user.types";

interface RankingUser {
  name: string;
  email: string;
  createdAt: string;
  course: 'SOFTWARE_ENGINEERING' | 'DATA_SCIENCE' | 'COMPUTING_SCIENCE' | 'INFORMATION_SYSTEMS' | 'COMPUTING_ENGINEERING';
  semester: 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH' | 'FIFTH' | 'SIXTH' | 'SEVENTH' | 'EIGHTH' | 'NINTH' | 'TENTH' | 'GRADUATED';
  avatarUrl: string | null;
  bannerUrl?: string | null;
  monthlyPoints?: number;
  allTimePoints?: number;
  submissions: number;
  problemsResolved: number;
}

export function RankingPage() {
  const [view, setView] = useState<"monthly" | "alltime">("monthly");
  const [selectedUser, setSelectedUser] = useState<UserWithAccount | null>(null);

  const mockMonthly: RankingUser[] = Array.from({ length: 10 }).map((_, i) => ({
    name: i === 1 ? "Bernardo Kirsch" : `Competidor ${i + 1}`,
    email: i === 1 ? "bernardo.kirsch@edu.pucrs.br" : `user${i}@pucrs.br`,
    createdAt: i === 1 ? "2024-03-01T00:00:00Z" : "2025-01-15T00:00:00Z",
    course: i === 1 ? 'SOFTWARE_ENGINEERING' : 'COMPUTING_SCIENCE',
    semester: i === 1 ? 'FOURTH' : 'SECOND',
    monthlyPoints: 2500 - (i * 150),
    problemsResolved: 45 - i,
    submissions: 120 - i,
    avatarUrl: i === 1 ? "https://github.com/bernardokirsch.png" : null,
  }));

  const mockAllTime: RankingUser[] = Array.from({ length: 10 }).map((_, i) => ({
    name: i === 0 ? "Bernardo Kirsch" : `Lenda ${i + 1}`,
    email: i === 0 ? "bernardo.kirsch@edu.pucrs.br" : `legend${i}@pucrs.br`,
    createdAt: "2023-08-10T00:00:00Z",
    course: 'SOFTWARE_ENGINEERING',
    semester: i === 0 ? 'FOURTH' : 'GRADUATED',
    allTimePoints: 15000 - (i * 1000),
    problemsResolved: 300 - (i * 10),
    submissions: 800 - (i * 20),
    avatarUrl: i === 0 ? "https://github.com/bernardokirsch.png" : null,
  }));

  const handleUserClick = (user: UserWithAccount) => {
    setSelectedUser(user);
  };

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] md:w-[95%] md:h-[95%] bg-primary/15 blur-[100px] md:blur-[200px] rounded-full animate-pulse z-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold text-primary tracking-widest uppercase shadow-xl">
          <Sparkles size={12} className="animate-spin-slow" />
          <span>Competição</span>
          <span className="h-1 w-1 rounded-full bg-primary/40 mx-1" />
          <span className="opacity-70">Temporada 2026</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-primary leading-none">
            RANKING
          </h1>
          <p className="text-muted-foreground mt-6 text-base md:text-xl font-medium max-w-2xl mx-auto">
            Os mestres da lógica. Acompanhe a evolução dos competidores da Liga.
          </p>
        </div>

        <div className="flex p-1.5 bg-secondary/20 rounded-full border border-white/10 backdrop-blur-md mb-10 w-full max-w-xs sm:max-w-md shadow-2xl">
          <button
            onClick={() => setView("monthly")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              view === "monthly" ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            <Calendar size={16} />
            Mensal
          </button>
          <button
            onClick={() => setView("alltime")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              view === "alltime" ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            <Globe2 size={16} />
            Geral
          </button>
        </div>

        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
          <RankingTable 
            data={view === "monthly" ? mockMonthly : mockAllTime} 
            onUserClick={handleUserClick}
          />
        </div>

        <UserInfoModal 
          user={selectedUser as any}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />

        <div className="mt-16 w-full max-w-3xl p-6 sm:p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
            <Trophy size={28} />
          </div>
          <div className="flex-1">
            <h4 className="text-lg sm:text-xl font-bold text-white">Quer aparecer aqui?</h4>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Resolva os problemas semanais e suba no ranking. Clique nos nomes para ver o perfil.
            </p>
          </div>
          <Button size="lg" className="w-full sm:w-auto rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold">
            Treinar Agora
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgb(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
    </div>
  );
}