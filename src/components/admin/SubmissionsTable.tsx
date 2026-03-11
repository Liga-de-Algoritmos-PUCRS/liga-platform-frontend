import { useState, useEffect, useCallback } from "react";
import { RefreshCcw, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import client from "@/api/client";
import { UserInfoModal } from "@/components/ranking/UserInfoModal";
import { UserResponseDTO,SubmitResponseDTO } from "@/api/sdk";

interface EnrichedSubmission {
  id: string;
  userId: string;
  userName: string;
  userFullData: UserResponseDTO | null;
  problemId: string;
  problemTitle: string;
  problemDifficulty: string; 
  attempts: number;
  isFinished: boolean;
  createdAt: string;
}

export function SubmissionsTable() {
  const [submissions, setSubmissions] = useState<EnrichedSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedUser, setSelectedUser] = useState<UserResponseDTO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [subsRes, usersRes, probsRes] = await Promise.all([
        client.submit.submitControllerGetAllSubmits(),
        client.user.userControllerGetAllUsers(),
        client.problem.problemControllerGetAllAdminProblems("teste")
      ]);

      const subsData = Array.isArray(subsRes.data) ? subsRes.data : [subsRes.data] as SubmitResponseDTO[];
      const usersData = usersRes.data;
      const probsData = probsRes.data;

      const enrichedData: EnrichedSubmission[] = subsData.map((sub: SubmitResponseDTO) => {
        const user = usersData.find((u) => u.id === sub.userId);
        const problem = probsData.find((p) => p.id === sub.problemId);

        return {
          id: sub.id,
          userId: sub.userId,
          userName: user?.name || "Usuário Deletado",
          userFullData: user || null,
          problemId: sub.problemId,
          problemTitle: problem?.title || "Problema Deletado",
          problemDifficulty: problem?.difficulty || "UNKNOWN",
          attempts: sub.attempts || 0,
          isFinished: sub.isFinished || false,
          createdAt: sub.createdAt,
        };
      });

      enrichedData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setSubmissions(enrichedData);
    } catch (error) {
      console.error("Erro ao buscar dados das submissões:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUserClick = (user: UserResponseDTO | null) => {
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const renderDifficultyBadge = (difficulty: string) => {
    const diff = difficulty.toUpperCase();
    
    if (diff === 'EASY' || diff === 'FÁCIL' || diff === 'FACIL') {
      return (
        <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Fácil
        </span>
      );
    }
    if (diff === 'MEDIUM' || diff === 'MÉDIO' || diff === 'MEDIO') {
      return (
        <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
          Médio
        </span>
      );
    }
    if (diff === 'HARD' || diff === 'DIFÍCIL' || diff === 'DIFICIL') {
      return (
        <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
          Difícil
        </span>
      );
    }
    return null;
  };

  return (
    <Card className="bg-background/50 border-white/10 text-white shadow-xl py-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Histórico Geral de Submissões</CardTitle>
          <CardDescription className="text-gray-400">
            Acompanhe em tempo real o código enviado por todos os usuários.
          </CardDescription>
        </div>
        
        <button 
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-secondary/40 hover:bg-secondary/80 border border-white/5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50"
        >
          <RefreshCcw size={16} className={cn(loading && "animate-spin")} />
          Atualizar
        </button>
      </CardHeader>

      <CardContent>
        <div className="rounded-xl border border-white/10 overflow-hidden bg-black/20">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left table-fixed min-w-[900px]">
              <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
                <tr>
                  <th className="w-[20%] px-6 py-4 font-semibold tracking-wider">Usuário</th>
                  <th className="w-[40%] px-6 py-4 font-semibold tracking-wider">Problema</th>
                  <th className="w-[10%] px-6 py-4 font-semibold tracking-wider text-center">Tentativas</th>
                  <th className="w-[15%] px-6 py-4 font-semibold tracking-wider text-center">Status</th>
                  <th className="w-[15%] px-6 py-4 font-semibold tracking-wider text-right">Data</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <RefreshCcw size={24} className="animate-spin text-primary/50" />
                        <span>Buscando registros...</span>
                      </div>
                    </td>
                  </tr>
                ) : submissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      Nenhuma submissão encontrada.
                    </td>
                  </tr>
                ) : (
                  submissions.map((sub) => (
                    <tr key={sub.id} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors">
                      <td className="px-6 py-4 truncate">
                        <button 
                          onClick={() => handleUserClick(sub.userFullData)}
                          className="font-semibold hover:text-primary hover:underline text-left transition-colors truncate w-full"
                          title={sub.userName}
                        >
                          {sub.userName}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 w-full">
                          <span 
                            className="truncate font-medium text-gray-200" 
                            title={sub.problemTitle}
                          >
                            {sub.problemTitle}
                          </span>
                          {renderDifficultyBadge(sub.problemDifficulty)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-gray-300">
                        {sub.attempts}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          {sub.isFinished ? (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold w-fit border border-emerald-500/20 whitespace-nowrap">
                              <CheckCircle2 size={14} />
                              Resolvido
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold w-fit border border-amber-500/20 whitespace-nowrap">
                              <Clock size={14} />
                              Tentando
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-400 text-xs font-mono truncate">
                        {new Date(sub.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>

      <UserInfoModal 
        user={selectedUser as UserResponseDTO}
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </Card>
  );
}