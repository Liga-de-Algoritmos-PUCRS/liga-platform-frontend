import { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Loader2, 
  Trophy, 
  Mail
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { UserInfoModal } from "@/components/ranking/UserInfoModal";
import client from "@/api/client";
import { UserResponseDTO } from "@/api/sdk";

export function MembersPage() {
  const [members, setMembers] = useState<UserResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserResponseDTO | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await client.user.userControllerGetAllUsers();
        setMembers(response.data as UserResponseDTO[]);
      } catch (error) {
        console.error("Erro ao carregar integrantes:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.email.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-full flex-1 flex flex-col items-center justify-center text-primary bg-[#0a0a0b]">
        <Loader2 size={48} className="animate-spin mb-4" />
        <h2 className="text-xl font-bold font-mono tracking-tighter uppercase">Sincronizando Integrantes...</h2>
      </div>
    );
  }

  return (
   
    <div className="relative flex-1 flex flex-col bg-[#0a0a0b] px-4 md:px-6 overflow-hidden pt-16 md:pt-9">
      
      <div className="fixed inset-0 bg-pink-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full overflow-hidden">
        
        <div className="py-6 shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase flex items-center justify-center md:justify-start gap-4">
                <Users className="text-primary" size={40} /> Integrantes
              </h1>
              <p className="text-gray-400 text-sm font-medium">Estatísticas de performance da Liga.</p>
            </div>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <Input 
                placeholder="Buscar por nome ou email..." 
                className="pl-12 h-12 bg-white/5 border-white/10 rounded-2xl text-white focus:ring-primary shadow-2xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

       
        <div className="flex-1 flex flex-col min-h-0 mb-6 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-2xl overflow-hidden">
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead className="sticky top-0 z-20 bg-[#121214]">
                <tr className="border-b border-white/5">
                  <th className="px-6 py-5 text-[10px] font-black text-fuchsia-500 uppercase tracking-[0.2em]">Nome</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-500">E-mail</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-500 text-center">Total Points</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-500 text-center">Submissões</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-500 text-center">Acertos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMembers.map((member) => (
                  <tr 
                    key={member.id} 
                    onClick={() => setSelectedUser(member)}
                    className="transition-colors hover:bg-white/[0.05] group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-white/10 group-hover:border-primary/50 transition-colors shadow-lg">
                          <AvatarImage src={member.avatarUrl || ""} className="object-cover" />
                          <AvatarFallback className="bg-primary/20 text-primary font-bold">
                            {member.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-white group-hover:text-primary transition-colors">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-300 font-mono">
                        <Mail size={14} className="text-gray-300" />
                        {member.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-fuchsia-500 font-mono font-bold text-sm shadow-sm">
                        <Trophy size={12} /> {member.allTimePoints || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-mono text-gray-300">
                      {member.submissions || 0}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-mono text-emerald-400 font-bold">
                      {member.problemsResolved || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <UserInfoModal 
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
}