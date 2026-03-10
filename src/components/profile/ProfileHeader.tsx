import { useState } from "react";
import { Camera } from "lucide-react";
import UserWithAccount from "@/types/user.types";
import { UserResponseDTOCourseEnum, UserResponseDTOSemesterEnum, UserResponseDTORoleEnum } from "@/api/sdk";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PhotoUploadModal } from "./PhotoUploadModal";
import { cn } from "@/lib/utils";

// Mapeamento de Labels
const COURSE_LABELS: Record<string, string> = {
  [UserResponseDTOCourseEnum.SoftwareEngineering]: "Engenharia de Software",
  [UserResponseDTOCourseEnum.DataScience]: "Ciência de Dados",
  [UserResponseDTOCourseEnum.ComputingScience]: "Ciência da Computação",
  [UserResponseDTOCourseEnum.InformationSystems]: "Sistemas de Informação",
  [UserResponseDTOCourseEnum.ComputingEngineering]: "Engenharia de Computação",
};

const SEMESTER_LABELS: Record<string, string> = {
  [UserResponseDTOSemesterEnum.First]: "1º Semestre",
  [UserResponseDTOSemesterEnum.Second]: "2º Semestre",
  [UserResponseDTOSemesterEnum.Third]: "3º Semestre",
  [UserResponseDTOSemesterEnum.Fourth]: "4º Semestre",
  [UserResponseDTOSemesterEnum.Fifth]: "5º Semestre",
  [UserResponseDTOSemesterEnum.Sixth]: "6º Semestre",
  [UserResponseDTOSemesterEnum.Seventh]: "7º Semestre",
  [UserResponseDTOSemesterEnum.Eighth]: "8º Semestre",
  [UserResponseDTOSemesterEnum.Ninth]: "9º Semestre",
  [UserResponseDTOSemesterEnum.Tenth]: "10º Semestre",
  [UserResponseDTOSemesterEnum.Graduated]: "Graduado",
};

// Mapeamento de Cores por Curso
const COURSE_COLORS: Record<string, string> = {
  [UserResponseDTOCourseEnum.SoftwareEngineering]: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  [UserResponseDTOCourseEnum.DataScience]: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  [UserResponseDTOCourseEnum.ComputingScience]: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  [UserResponseDTOCourseEnum.InformationSystems]: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  [UserResponseDTOCourseEnum.ComputingEngineering]: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export interface ProfileHeaderProps {
  user: UserWithAccount;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"avatar" | "banner">("avatar");

  const handleOpenModal = (type: "avatar" | "banner") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="relative mb-12">
      <div className="relative h-48 md:h-64 w-full rounded-[32px] overflow-hidden bg-white/[0.02] border border-white/5">
        {user.bannerUrl ? (
          <img src={user.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-90" />
        <button 
          onClick={() => handleOpenModal("banner")}
          className="absolute bottom-6 right-6 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all group z-20"
        >
          <Camera className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 px-8 -mt-16 relative z-10">
        <div className="relative group cursor-pointer" onClick={() => handleOpenModal("avatar")}>
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-[6px] border-[#0a0a0b] bg-[#0a0a0b] shadow-2xl">
            <AvatarImage src={user.avatarUrl || ""} className="object-cover" />
            <AvatarFallback className="text-4xl font-black bg-primary/10 text-primary">
              {user.name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left pb-4">
          <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-white">
            {user.name}
          </h1>
          
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mt-3">
            <Badge className={cn(
              "border text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
              user.role === UserResponseDTORoleEnum.Admin 
                ? "bg-red-500/10 text-red-400 border-red-500/20" 
                : "bg-primary/10 text-primary border-primary/20"
            )}>
              {user.role === UserResponseDTORoleEnum.Admin ? "Administrador" : "Membro"}
            </Badge>
            
            {user.course && (
              <Badge className={cn(
                "border text-[10px] font-bold uppercase tracking-tight px-3 py-1 rounded-full",
                COURSE_COLORS[user.course] || "bg-white/5 text-gray-300 border-white/10"
              )}>
                {COURSE_LABELS[user.course] || user.course}
              </Badge>
            )}
            
            {user.semester && (
              <Badge className="bg-white/5 text-gray-400 border-white/10 text-[10px] font-medium italic px-3 py-1 rounded-full backdrop-blur-sm">
                {SEMESTER_LABELS[user.semester] || user.semester}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <PhotoUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={modalType}
        user={user}
      />
    </div>
  );
}