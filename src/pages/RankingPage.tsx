import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { RankingTable } from "@/components/ranking/RankingTable";
import { UserInfoModal } from "@/components/ranking/UserInfoModal";
import { Button } from "@/components/ui/button";
import { Calendar, Globe2, Trophy, Sparkles, Loader2, AlertTriangle } from "lucide-react";
import { UserResponseDTO } from "@/api/sdk";
import client from "@/api/client";
import { toast } from "sonner"
import { useAuth } from "@/providers/AuthProvider";

export function RankingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'ROOT';

  const [view, setView] = useState<"monthly" | "alltime">("monthly");
  const [selectedUser, setSelectedUser] = useState<UserResponseDTO | null>(null);
  
  const [monthlyUsers, setMonthlyUsers] = useState<UserResponseDTO[]>([]);
  const [allTimeUsers, setAllTimeUsers] = useState<UserResponseDTO[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  const fetchRankings = useCallback(async () => {
    setIsLoading(true);
    let isMounted = true;
    
    try {
      const [monthlyResponse, allTimeResponse] = await Promise.all([
        client.user.userControllerGetMonthlyTopUsers(),
        client.user.userControllerGetTopUsers(),
      ]);

      if (isMounted) {
        setMonthlyUsers(monthlyResponse.data as UserResponseDTO[]);
        setAllTimeUsers(allTimeResponse.data as UserResponseDTO[]);
      }
    } catch (error) {
      if (isMounted) console.error("Erro ao buscar dados do ranking:", error);
    } finally {
      if (isMounted) setIsLoading(false);
    }

    return () => { isMounted = false };
  }, []);

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  const handleUserClick = (user: UserResponseDTO) => {
    setSelectedUser(user);
  };

  const handleResetPoints = async () => {
    const confirmReset = window.confirm(
      "CUIDADO: Tem certeza que deseja zerar a pontuação mensal de TODOS os usuários da Liga? Essa ação é irreversível."
    );
    
    if (!confirmReset) return;

    try {
      setIsResetting(true);
      await client.user.userControllerResetUserPoints();
      toast.success("Pontuação mensal zerada com sucesso!");
      await fetchRankings();
    } catch (error) {
      console.error("Erro ao zerar as pontuações:", error);
      toast.error("Ocorreu um erro ao tentar zerar as pontuações.");
    } finally {
      setIsResetting(false);
    }
  };

  const currentData = view === "monthly" ? monthlyUsers : allTimeUsers;

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      
      {/* Efeito de Blur Rosinha no fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] md:w-[95%] md:h-[95%] bg-pink-500/15 blur-[100px] md:blur-[200px] rounded-full animate-pulse z-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold text-primary tracking-widest uppercase shadow-xl">
          <Sparkles size={12} className="animate-spin-slow" />
          <span>Competição</span>
          <span className="h-1 w-1 rounded-full bg-primary/40 mx-1" />
          <span className="opacity-70">Temporada 2026</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-fuchsia-600 leading-none">
            RANKING
          </h1>
          <p className="text-muted-foreground mt-6 text-base md:text-xl font-medium max-w-2xl mx-auto">
            Os mestres da lógica. Acompanhe a evolução dos competidores da Liga.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 mb-10 w-full max-w-xs sm:max-w-md">
          <div className="flex p-1.5 bg-secondary/20 rounded-full border border-white/10 backdrop-blur-md w-full shadow-2xl">
            <button
              onClick={() => setView("monthly")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                view === "monthly" ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-white"
              }`}
              disabled={isLoading}
            >
              <Calendar size={16} />
              Mensal
            </button>
            <button
              onClick={() => setView("alltime")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                view === "alltime" ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-white"
              }`}
              disabled={isLoading}
            >
              <Globe2 size={16} />
              Geral
            </button>
          </div>

          {isAdmin && view === "monthly" && (
            <Button
              onClick={handleResetPoints}
              disabled={isResetting || isLoading}
              className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full px-6 shadow-lg shadow-red-900/20 border border-red-500/50 w-full sm:w-auto transition-all"
            >
              {isResetting ? (
                <Loader2 size={16} className="animate-spin mr-2" />
              ) : (
                <AlertTriangle size={16} className="mr-2" />
              )}
              {isResetting ? "Zerando..." : "Zerar Pontuação Mensal"}
            </Button>
          )}
        </div>

        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 min-h-[300px] flex justify-center">
          {isLoading ? (
             <div className="flex items-center justify-center mt-20">
               <Loader2 className="animate-spin text-primary" size={48} />
             </div>
          ) : (
            <RankingTable 
              data={currentData} 
              onUserClick={handleUserClick}
            />
          )}
        </div>

        <UserInfoModal 
          user={selectedUser}
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
          <Button size="lg" className="w-full sm:w-auto rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold" onClick={() => navigate({ to: "/problemas" })}>
             Ver Problemas
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