import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud } from "lucide-react";
import client from "@/api/client";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import UserWithAccount from "@/types/user.types";
import { UpdateUserDTO } from "@/api/sdk";
import { cn } from "@/lib/utils";

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "avatar" | "banner";
  user: UserWithAccount;
}

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg"];
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;

export function PhotoUploadModal({ isOpen, onClose, type, user }: PhotoUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { refetchUser } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    e.target.value = "";

    if (!selected) {
      setFile(null);
      return;
    }

    if (!ALLOWED_MIME_TYPES.includes(selected.type)) {
      toast.error("Formato inválido. Envie um arquivo PNG ou JPG.");
      return;
    }

    if (selected.size > MAX_FILE_SIZE_BYTES) {
      toast.error("Arquivo muito grande. O tamanho máximo é 2MB.");
      return;
    }

    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setIsUploading(true);
    try {
      const response = await client.file.fileControllerCreate(file);
      const imageUrl = response.data[0]?.fileUrl;

      if (!imageUrl) {
        toast.error("O upload não retornou um arquivo válido. Tente novamente.");
        return;
      }

      const updatePayload: UpdateUserDTO = type === "avatar"
        ? { avatarUrl: imageUrl }
        : { bannerUrl: imageUrl };

      await client.user.userControllerUpdateUser(user.id, updatePayload);

      try {
        await refetchUser();
      } catch (refetchError) {
        // O upload já foi salvo; falha só na re-sincronização do perfil
        console.error(refetchError);
      }

      toast.success(`${type === 'avatar' ? 'Foto de perfil' : 'Banner'} atualizado!`);
      onClose();
      setFile(null);
    } catch (error) {
      toast.error("Erro ao processar o upload.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#0a0a0b] border-white/10 text-white sm:max-w-md rounded-[32px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase italic tracking-tighter">
            Atualizar {type === "avatar" ? "Avatar" : "Banner"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div 
            className="group relative border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-all cursor-pointer bg-white/[0.02]"
            onClick={() => document.getElementById(`file-input-${type}`)?.click()}
          >
            <input 
              id={`file-input-${type}`}
              type="file"
              className="hidden"
              accept={ALLOWED_MIME_TYPES.join(",")}
              onChange={handleFileChange}
            />
            <UploadCloud className={cn("h-10 w-10 transition-colors", file ? 'text-primary' : 'text-gray-500')} />
            <div className="text-center">
              <p className="text-sm font-bold">{file ? file.name : "Clique para selecionar"}</p>
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">PNG ou JPG (Máx 2MB)</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="flex-1 text-[10px] font-black uppercase tracking-widest rounded-xl"
            >
              Cancelar
            </Button>
            <Button 
              disabled={!file || isUploading} 
              onClick={handleUpload}
              className="flex-1 bg-primary hover:bg-primary/90 font-black uppercase italic rounded-xl"
            >
              {isUploading ? <Loader2 className="animate-spin h-4 w-4" /> : "Confirmar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}