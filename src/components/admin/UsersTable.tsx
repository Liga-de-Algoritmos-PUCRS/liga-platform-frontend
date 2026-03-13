import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw, Edit2, Trash2, Shield, User as UserIcon, AlertTriangle, Search, ImageOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import client from "@/api/client";
import { UserResponseDTO, UpdateUserDTO } from "@/api/sdk";
import { UserInfoModal, UserInterface } from "@/components/ranking/UserInfoModal";

const COURSES = [
  { value: "SOFTWARE_ENGINEERING", label: "Engenharia de Software" },
  { value: "DATA_SCIENCE", label: "Ciência de Dados" },
  { value: "COMPUTING_SCIENCE", label: "Ciência da Computação" },
  { value: "INFORMATION_SYSTEMS", label: "Sistemas de Informação" },
  { value: "COMPUTING_ENGINEERING", label: "Engenharia da Computação" },
];

const SEMESTERS = [
  { value: "FIRST", label: "1º Semestre" },
  { value: "SECOND", label: "2º Semestre" },
  { value: "THIRD", label: "3º Semestre" },
  { value: "FOURTH", label: "4º Semestre" },
  { value: "FIFTH", label: "5º Semestre" },
  { value: "SIXTH", label: "6º Semestre" },
  { value: "SEVENTH", label: "7º Semestre" },
  { value: "EIGHTH", label: "8º Semestre" },
  { value: "NINTH", label: "9º Semestre" },
  { value: "TENTH", label: "10º Semestre" },
  { value: "GRADUATED", label: "Formado" },
];

export function UsersTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const [editingUser, setEditingUser] = useState<UserResponseDTO | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserResponseDTO | null>(null);
  
  const [selectedUser, setSelectedUser] = useState<UserResponseDTO | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  
  const [editFormData, setEditFormData] = useState<UpdateUserDTO>({});
  const [deletePassword, setDeletePassword] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // React Query para buscar usuários
  const { data: response, isLoading: loading, refetch } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: () => client.user.userControllerGetAllUsers()
  });

  const users = useMemo(() => {
    if (!response?.data) return [];
    return [...response.data].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [response?.data]);

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    setActionLoading(true);
    try {
      const payload: UpdateUserDTO = {
        name: editFormData.name,
      };

      if (editFormData.course && editFormData.course !== "") {
        payload.course = editFormData.course;
      }
      
      if (editFormData.semester && editFormData.semester !== "") {
        payload.semester = editFormData.semester;
      }

      if (editFormData.avatarUrl === "") {
        payload.avatarUrl = ""; 
      }
      if (editFormData.bannerUrl === "") {
        payload.bannerUrl = ""; 
      }

      await client.user.userControllerUpdateUser(editingUser.id, payload);
      
      setEditingUser(null);
      await refetch();
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar utilizador:", error);
      toast.error("Erro ao atualizar o usuário!");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deletingUser || !deletePassword) return;

    setActionLoading(true);
    try {
      await client.user.userControllerDeleteUser(deletingUser.id, { password: deletePassword });
      setDeletingUser(null);
      setDeletePassword("");
      await refetch(); // <-- Atualizado aqui (antigo fetchUsers)
      toast.success("Usuário deletado com sucesso!");
    } catch {
      toast.error("Erro ao deletar o usuário!");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Card className="bg-background/50 border-white/10 text-white shadow-xl py-4">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle>Controle de Utilizadores</CardTitle>
          <CardDescription className="text-gray-400">
            Gerencie as contas da plataforma, edite informações ou remova membros.
          </CardDescription>
        </div>
        
        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Pesquisar utilizador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white focus-visible:ring-primary w-full"
            />
          </div>
          <button 
            onClick={() => refetch()}
            disabled={loading}
            className="flex items-center justify-center p-2.5 sm:px-4 sm:py-2 bg-secondary/40 hover:bg-secondary/80 border border-white/5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 shrink-0"
            title="Atualizar lista"
          >
            <RefreshCcw size={16} className={cn(loading && "animate-spin", "sm:mr-2")} />
            <span className="hidden sm:inline">Atualizar</span>
          </button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-xl border border-white/10 overflow-hidden bg-black/20">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left table-fixed min-w-[900px]">
              <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
                <tr>
                  <th className="w-[30%] px-6 py-4 font-semibold tracking-wider">Utilizador</th>
                  <th className="w-[15%] px-6 py-4 font-semibold tracking-wider text-center">Cargo</th>
                  <th className="w-[20%] px-6 py-4 font-semibold tracking-wider">Curso / Semestre</th>
                  <th className="w-[15%] px-6 py-4 font-semibold tracking-wider text-center">Pontos (Total)</th>
                  <th className="w-[20%] px-6 py-4 font-semibold tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <RefreshCcw size={24} className="animate-spin text-primary/50" />
                        <span>A carregar utilizadores...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      {searchTerm ? "Nenhum utilizador encontrado com esta pesquisa." : "Nenhum utilizador registado."}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors">
                      <td className="px-6 py-4 truncate">
                        <div className="flex flex-col w-full">
                          <button 
                            onClick={() => {
                              setSelectedUser(user);
                              setIsInfoModalOpen(true);
                            }}
                            className="text-left font-semibold hover:text-primary hover:underline truncate w-full transition-colors"
                            title={`Ver perfil de ${user.name}`}
                          >
                            {user.name}
                          </button>
                          <span className="text-xs text-gray-500 truncate" title={user.email}>
                            {user.email}
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          {user.role === 'ADMIN' ? (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-bold w-fit border border-purple-500/20">
                              <Shield size={14} /> ADMIN
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-bold w-fit border border-blue-500/20">
                              <UserIcon size={14} /> USER
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                         <div className="flex flex-col truncate">
                          <span className="text-gray-300 text-xs truncate">
                            {user.course ? COURSES.find(c => c.value === user.course)?.label || user.course : "Não informado"}
                          </span>
                          <span className="text-gray-500 text-[10px] font-mono uppercase">
                            {user.semester ? SEMESTERS.find(s => s.value === user.semester)?.label || user.semester : "--"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center font-mono text-primary font-bold">
                        {user.allTimePoints || 0}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => {
                              setEditingUser(user);
                              setEditFormData({
                                name: user.name,
                                course: user.course,
                                semester: user.semester,
                                avatarUrl: user.avatarUrl || undefined,
                                bannerUrl: user.bannerUrl || undefined
                              });
                            }}
                            className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-md transition-colors border border-white/5"
                            title="Editar Utilizador"
                          >
                            <Edit2 size={16} />
                          </button>
                          
                          <button 
                            onClick={() => setDeletingUser(user)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-md transition-colors border border-red-500/20"
                            title="Eliminar Utilizador"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
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
        user={selectedUser as UserInterface}
        isOpen={isInfoModalOpen} 
        onClose={() => setIsInfoModalOpen(false)} 
      />

      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="bg-[#0a0a0b] border-white/10 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Utilizador</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateUser} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-400">Nome Completo</Label>
              <Input 
                id="name" 
                value={editFormData.name || ""} 
                onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                className="bg-white/5 border-white/10 text-white focus-visible:ring-primary" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course" className="text-gray-400">Curso</Label>
                <select
                  id="course"
                  value={editFormData.course || ""}
                  onChange={(e) => setEditFormData({...editFormData, course: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="" className="bg-[#0a0a0b] text-gray-400">Nenhum</option>
                  {COURSES.map(course => (
                    <option key={course.value} value={course.value} className="bg-[#0a0a0b] text-white">
                      {course.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester" className="text-gray-400">Semestre</Label>
                <select
                  id="semester"
                  value={editFormData.semester || ""}
                  onChange={(e) => setEditFormData({...editFormData, semester: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="" className="bg-[#0a0a0b] text-gray-400">Nenhum</option>
                  {SEMESTERS.map(sem => (
                    <option key={sem.value} value={sem.value} className="bg-[#0a0a0b] text-white">
                      {sem.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10 mt-2">
              <Label className="text-gray-400">Moderação de Imagens</Label>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  disabled={!editFormData.avatarUrl && editFormData.avatarUrl !== ""} 
                  onClick={() => setEditFormData({...editFormData, avatarUrl: ""})}
                  className="flex-1 bg-white/5 border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 disabled:opacity-30"
                >
                  <ImageOff size={14} className="mr-2" /> Limpar Avatar
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  disabled={!editFormData.bannerUrl && editFormData.bannerUrl !== ""} 
                  onClick={() => setEditFormData({...editFormData, bannerUrl: ""})}
                  className="flex-1 bg-white/5 border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 disabled:opacity-30"
                >
                  <ImageOff size={14} className="mr-2" /> Limpar Banner
                </Button>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setEditingUser(null)} className="hover:bg-white/10 text-gray-300">
                Cancelar
              </Button>
              <Button type="submit" disabled={actionLoading} className="bg-primary text-white hover:bg-primary/90">
                {actionLoading ? "A guardar..." : "Guardar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deletingUser} onOpenChange={(open) => !open && setDeletingUser(null)}>
        <DialogContent className="bg-[#0a0a0b] border-red-500/20 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle size={20} />
              Eliminar Utilizador
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleDeleteUser} className="space-y-4 py-2">
            <p className="text-sm text-gray-400">
              Tens a certeza de que pretendes eliminar o utilizador <strong className="text-white">{deletingUser?.name}</strong>? Esta ação é irreversível.
            </p>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-400">Confirma a password para continuar</Label>
              <Input 
                id="password" 
                type="password"
                required
                placeholder="Insere a password"
                value={deletePassword} 
                onChange={(e) => setDeletePassword(e.target.value)}
                className="bg-white/5 border-red-500/20 text-white focus-visible:ring-red-500" 
              />
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setDeletingUser(null)} className="hover:bg-white/10 text-gray-300">
                Cancelar
              </Button>
              <Button type="submit" disabled={actionLoading || !deletePassword} className="bg-red-500 text-white hover:bg-red-600">
                {actionLoading ? "A eliminar..." : "Sim, Eliminar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}