import { useState, useEffect } from "react";
import { Trophy, Code2, Target, Zap, CheckCircle2 } from "lucide-react"; // Adicionei CheckCircle2
import { useAuth } from "@/providers/AuthProvider";
import client from "@/api/client";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserWithAccount from "@/types/user.types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { 
  UserResponseDTOCourseEnum, 
  UserResponseDTOSemesterEnum,
  UpdateUserDTO,
  SubmitResponseDTO,
  ProblemResponseDTO
} from "@/api/sdk";

const COURSES = [
  { value: UserResponseDTOCourseEnum.SoftwareEngineering, label: "Engenharia de Software" },
  { value: UserResponseDTOCourseEnum.DataScience, label: "Ciência de Dados" },
  { value: UserResponseDTOCourseEnum.ComputingScience, label: "Ciência da Computação" },
  { value: UserResponseDTOCourseEnum.InformationSystems, label: "Sistemas de Informação" },
  { value: UserResponseDTOCourseEnum.ComputingEngineering, label: "Engenharia de Computação" },
];

const SEMESTERS = [
  { value: UserResponseDTOSemesterEnum.First, label: "1º Semestre" },
  { value: UserResponseDTOSemesterEnum.Second, label: "2º Semestre" },
  { value: UserResponseDTOSemesterEnum.Third, label: "3º Semestre" },
  { value: UserResponseDTOSemesterEnum.Fourth, label: "4º Semestre" },
  { value: UserResponseDTOSemesterEnum.Fifth, label: "5º Semestre" },
  { value: UserResponseDTOSemesterEnum.Sixth, label: "6º Semestre" },
  { value: UserResponseDTOSemesterEnum.Seventh, label: "7º Semestre" },
  { value: UserResponseDTOSemesterEnum.Eighth, label: "8º Semestre" },
  { value: UserResponseDTOSemesterEnum.Ninth, label: "9º Semestre" },
  { value: UserResponseDTOSemesterEnum.Tenth, label: "10º Semestre" },
  { value: UserResponseDTOSemesterEnum.Graduated, label: "Graduado" }
];

export function ProfilePage() {
  const { user, refetchUser } = useAuth(); 
  const [activeTab, setActiveTab] = useState<"info" | "progress">("info");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [submits, setSubmits] = useState<SubmitResponseDTO[]>([]);
  const [problemNames, setProblemNames] = useState<Record<string, string>>({});
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);

  const [formData, setFormData] = useState<UpdateUserDTO>({
    name: user?.name || "",
    course: user?.course,
    semester: user?.semester,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        course: user.course,
        semester: user.semester,
      });
    }
  }, [user?.id]);

  useEffect(() => {
    const fetchProgressData = async () => {
      if (!user?.id || activeTab !== "progress") return;
      setIsLoadingProgress(true);
      try {
        const [submitsRes, problemsRes] = await Promise.all([
          client.submit.submitControllerGetSubmitByUserId(user.id),
          client.problem.problemControllerGetAllProblems()
        ]);
        const sortedSubmits = (submitsRes.data as SubmitResponseDTO[]).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setSubmits(sortedSubmits);
        const namesMap: Record<string, string> = {};
        (problemsRes.data as ProblemResponseDTO[]).forEach((p) => {
          namesMap[p.id] = p.title;
        });
        setProblemNames(namesMap);
      } catch (error) {
        console.error("Erro ao carregar dados de progresso:", error);
        toast.error("Não foi possível carregar o seu progresso.");
      } finally {
        setIsLoadingProgress(false);
      }
    };
    fetchProgressData();
  }, [user?.id, activeTab]);

  const handleUpdateProfile = async () => {
    if (!user?.id) return;
    setIsSaving(true);
    try {
      await client.user.userControllerUpdateUser(user.id, {
        name: formData.name,
        course: formData.course || undefined,
        semester: formData.semester || undefined,
      });
      toast.success("Perfil atualizado com sucesso!");
      setIsEditing(false);
      await refetchUser();
    } catch (error) { 
      toast.error("Erro ao guardar as alterações.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null;

  // CÁLCULO DA TAXA DE ACERTO
  const successRate = user.submissions && user.submissions > 0 
    ? Math.round((user.problemsResolved ?? 0 / user.submissions) * 100) 
    : 0;

  return (
    <div className="h-screen bg-[#0a0a0b] text-white flex flex-col overflow-hidden">
      <div className="container max-w-6xl mx-auto pt-10 px-4 pb-10 flex flex-col flex-1 min-h-0">
        
        <div className="flex-shrink-0">
          <ProfileHeader user={user as UserWithAccount} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
          
          <div className="lg:col-span-4 h-full flex flex-col">
            <Card className="bg-white/[0.02] border-white/5 rounded-[32px] py-7 flex flex-col h-full">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-primary">
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 overflow-y-auto custom-scrollbar">
                <StatRow label="Pontos Totais" value={user.allTimePoints ?? 0} icon={Trophy} color="text-yellow-500" />
                <StatRow label="Pontos Mensais" value={user.monthlyPoints ?? 0} icon={Zap} color="text-primary" />
                <StatRow label="Resolvidos" value={user.problemsResolved ?? 0} icon={Code2} color="text-blue-500" />
                <StatRow label="Submissões" value={user.submissions ?? 0} icon={Target} color="text-emerald-500" />
                
                <StatRow 
                  label="Taxa de Acerto" 
                  value={`${successRate}%`} 
                  icon={CheckCircle2} 
                  color="text-orange-500" 
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8 h-full flex flex-col min-h-0">
            <Card className="bg-white/[0.02] border-white/10 rounded-[32px] flex flex-col h-full overflow-hidden">
              <div className="flex border-b border-white/5 px-8 pt-6 gap-8 flex-shrink-0">
                <TabButton active={activeTab === "info"} onClick={() => setActiveTab("info")} label="Informações" />
                <TabButton active={activeTab === "progress"} onClick={() => setActiveTab("progress")} label="Meu Progresso" />
              </div>

              <CardContent className="p-8 flex-1 overflow-y-auto custom-scrollbar min-h-0">
                {activeTab === "info" ? (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-primary tracking-widest">Nome Completo</Label>
                        <input 
                          disabled={!isEditing}
                          className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm disabled:opacity-50 transition-colors focus:border-primary/50 outline-none"
                          value={formData.name || ""}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-primary tracking-widest">Curso</Label>
                        <select 
                          disabled={!isEditing}
                          className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm appearance-none disabled:opacity-50 focus:border-primary/50 outline-none cursor-pointer"
                          value={formData.course || ""}
                          onChange={(e) => setFormData({...formData, course: e.target.value as UserResponseDTOCourseEnum})}
                        >
                          <option value="">Selecione o curso</option>
                          {COURSES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-primary tracking-widest">Semestre</Label>
                        <select 
                          disabled={!isEditing}
                          className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm appearance-none disabled:opacity-50 focus:border-primary/50 outline-none cursor-pointer"
                          value={formData.semester || ""}
                          onChange={(e) => setFormData({...formData, semester: e.target.value as UserResponseDTOSemesterEnum})}
                        >
                          <option value="">Selecione o semestre</option>
                          {SEMESTERS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="pt-6 flex justify-end gap-3 border-t border-white/5">
                      {isEditing ? (
                        <>
                          <Button variant="ghost" disabled={isSaving} onClick={() => { setIsEditing(false); setFormData({ name: user.name, course: user.course, semester: user.semester }); }} className="rounded-xl font-bold uppercase text-xs">Cancelar</Button>
                          <Button onClick={handleUpdateProfile} disabled={isSaving} className="bg-primary hover:bg-primary/90 rounded-xl font-black uppercase text-xs px-8">{isSaving ? "A guardar..." : "Guardar"}</Button>
                        </>
                      ) : (
                        <Button onClick={() => setIsEditing(true)} variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl font-black uppercase text-xs">Editar Perfil</Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-500 h-full">
                    {isLoadingProgress ? (
                      <div className="py-20 text-center text-gray-500 italic animate-pulse">A carregar submissões...</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead className="sticky top-0 bg-[#0d0d0e] z-10">
                            <tr className="border-b border-white/5">
                              <th className="pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-primary">Problema</th>
                              <th className="pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-primary text-center">Resolvido</th>
                              <th className="pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-primary text-center">Tentativas</th>
                              <th className="pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-primary text-center">Pontos</th>
                              <th className="pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-primary text-right">Data</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {submits.map((sub) => (
                              <tr key={sub.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="py-4 px-2 text-sm font-bold max-w-[150px]">
                                  <div className="truncate" title={problemNames[sub.problemId]}>
                                    {problemNames[sub.problemId] || "Problema desconhecido"}
                                  </div>
                                </td>
                                <td className="py-4 px-2 text-center">
                                  <span className={cn("text-[10px] font-black uppercase px-2 py-1 rounded-md", sub.isFinished ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500")}>
                                    {sub.isFinished ? "Sim" : "Não"}
                                  </span>
                                </td>
                                <td className="py-4 px-2 text-center font-bold text-sm text-gray-400">{sub.attempts}</td>
                                <td className={cn("py-4 px-2 text-center font-black italic text-sm", !sub.isFinished && "text-gray-500")}>{sub.isFinished ? sub.pointsEarned : "X"}</td>
                                <td className="py-4 px-2 text-right text-xs text-gray-500 font-medium whitespace-nowrap">{new Date(sub.createdAt).toLocaleDateString('pt-BR')}</td>
                              </tr>
                            ))}
                            {submits.length === 0 && (
                              <tr><td colSpan={5} className="py-20 text-center text-gray-500 italic text-sm">Nenhuma submissão encontrada.</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// AJUSTE NA TIPAGEM: value agora aceita string | number
interface StatRowProps { label: string; value: string | number; icon: React.ElementType; color: string; }
function StatRow({ label, value, icon: Icon, color }: StatRowProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-black/40"><Icon className={cn("h-5 w-5", color)} /></div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">{label}</span>
      </div>
      <span className="text-xl font-black italic">{value}</span>
    </div>
  );
}

function TabButton({ active, onClick, label }) {
  return (
    <button onClick={onClick} className={cn("pb-4 text-[10px] font-black uppercase tracking-widest transition-all outline-none", active ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-white")}>
      {label}
    </button>
  );
}