import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Terminal, 
  Trophy, 
  Target, 
  Layers, 
  Mail, 
  CalendarDays,
  GraduationCap,
  Sparkles
} from "lucide-react";

const COURSE_LABELS: Record<string, string> = {
  SOFTWARE_ENGINEERING: "Eng. Software",
  DATA_SCIENCE: "Ciência de Dados",
  COMPUTING_SCIENCE: "Ciência da Comp.",
  INFORMATION_SYSTEMS: "Sist. Informação",
  COMPUTING_ENGINEERING: "Eng. Computação",
};

const SEMESTER_LABELS: Record<string, string> = {
  FIRST: "1º Sem", SECOND: "2º Sem", THIRD: "3º Sem", FOURTH: "4º Sem",
  FIFTH: "5º Sem", SIXTH: "6º Sem", SEVENTH: "7º Sem", EIGHTH: "8º Sem",
  NINTH: "9º Sem", TENTH: "10º Sem", GRADUATED: "Formado",
};

interface UserInterface {
  name: string;
  email: string;
  createdAt?: string;
  course?: string;
  semester?: string;
  bannerUrl?: string | null;
  avatarUrl?: string | null;
  monthlyPoints?: number;
  allTimePoints?: number;
  submissions?: number;
  problemsResolved?: number;
}

interface UserInfoModalProps {
  user: UserInterface | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserInfoModal({ user, isOpen, onClose }: UserInfoModalProps) {
  if (!user) return null;

  const joinYear = user.createdAt ? new Date(user.createdAt).getFullYear() : "2026";

  const stats = [
    { label: "Resolvidos", value: user.problemsResolved || 0, icon: Target, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Submissões", value: user.submissions || 0, icon: Terminal, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Pontos Mês", value: user.monthlyPoints || 0, icon: Trophy, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Pontos Total", value: user.allTimePoints || 0, icon: Layers, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-[500px] p-0 overflow-hidden border-white/10 bg-[#0a0a0b]/95 backdrop-blur-3xl text-white shadow-2xl shadow-primary/20 outline-none rounded-3xl">
        
        {/* Banner mais baixo para achatar o card */}
        <div className="relative h-24 sm:h-28 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-purple-600/40 to-blue-900/60" />
          {user.bannerUrl && (
            <img src={user.bannerUrl} alt="Banner" className="h-full w-full object-cover mix-blend-overlay opacity-50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
        </div>

        {/* Avatar e Tags Responsivas */}
        <div className="relative px-4 sm:px-8 -mt-10 sm:-mt-12 flex flex-row items-end justify-between gap-2">
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-blue-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-[4px] sm:border-[6px] border-[#0a0a0b] shadow-2xl relative">
              <AvatarImage src={user.avatarUrl || ""} className="object-cover" />
              <AvatarFallback className="bg-secondary text-2xl font-black text-white">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-wrap justify-end gap-1.5 mb-1 sm:mb-2">
            {user.course && (
              <div className="px-2 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] sm:text-[10px] font-bold text-primary flex items-center gap-1 shrink-0">
                <GraduationCap size={10} className="text-primary" />
                {COURSE_LABELS[user.course] || user.course}
              </div>
            )}
            {user.semester && (
              <div className="px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 shrink-0">
                <Sparkles size={10} className="text-gray-400" />
                {SEMESTER_LABELS[user.semester] || user.semester}
              </div>
            )}
          </div>
        </div>

        {/* Nome e Infos Centralizadas/Alinhadas */}
        <div className="px-5 sm:px-8 pt-4 pb-5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 truncate">
            {user.name}
          </h2>
          
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2.5 group">
              <Mail size={14} className="text-primary/70 shrink-0" />
              <span className="text-xs sm:text-sm text-gray-400 font-medium truncate group-hover:text-gray-200 transition-colors">
                {user.email}
              </span>
            </div>

            <div className="flex items-center gap-2.5 group">
              <CalendarDays size={14} className="text-primary/70 shrink-0" />
              <span className="text-xs sm:text-sm text-gray-500 font-mono tracking-tight">
                Desde <span className="text-primary/90 font-bold">{joinYear}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid em 2 colunas fixas */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 px-5 sm:px-8 pb-6">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/5 bg-white/[0.02] p-3 sm:p-4 flex flex-col items-center group"
            >
              <stat.icon size={16} className={`${stat.color} mb-2 group-hover:scale-110 transition-transform`} />
              <span className="text-lg sm:text-xl font-black font-mono tracking-tighter text-white">
                {stat.value.toLocaleString()}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Minimalista */}
        <div className="py-3 bg-white/[0.02] text-center border-t border-white/5">
          <p className="text-[8px] text-gray-600 font-mono uppercase tracking-[0.3em] font-bold">
            Liga de Algoritmos • PUCRS
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}