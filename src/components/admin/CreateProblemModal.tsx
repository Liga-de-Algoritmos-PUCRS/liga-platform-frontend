import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import client from "@/api/client";
import { CreateProblemDTO } from "@/api/sdk";

interface CreateProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; 
}

export function CreateProblemModal({ isOpen, onClose, onSuccess }: CreateProblemModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "EASY",
    points: 0,
    input: "",
    answer: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.input || !formData.answer) {
      toast.error("Por favor, preenche todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    try {
      let bannerUrl = "";

      if (bannerFile) {
        toast.loading("A fazer upload da capa...", { id: "upload-toast" });
        const fileResponse = await client.file.fileControllerCreate(bannerFile);
        bannerUrl = fileResponse.data[0].fileUrl; 
        toast.dismiss("upload-toast");
      }

      const newProblem: CreateProblemDTO = {
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        points: Number(formData.points),
        input: formData.input,
        answer: formData.answer,
        bannerUrl: bannerUrl, 
        archived: false,
        fixed: false
      };

      toast.loading("A criar problema...", { id: "create-toast" });
      await client.problem.problemControllerCreateProblem(newProblem);
      toast.dismiss("create-toast");
      
      toast.success("Problema criado com sucesso!");
      
      setFormData({ title: "", description: "", difficulty: "EASY", points: 0, input: "", answer: "" });
      setBannerFile(null);
      
      onSuccess(); 
      onClose();  

    } catch (error) {
      toast.dismiss();
      toast.error("Ocorreu um erro ao criar o problema.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#0a0a0b] border-white/10 text-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold uppercase tracking-wide">
            Novo Problema
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          
          <div className="space-y-2">
            <Label className="text-gray-400">Imagem de Capa (Opcional)</Label>
            <div 
              className={cn(
                "group relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer bg-white/[0.02]",
                bannerFile ? "border-primary/50" : "border-white/10 hover:border-white/30"
              )}
              onClick={() => document.getElementById('problem-banner-upload')?.click()}
            >
              <input 
                id="problem-banner-upload"
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
              />
              <UploadCloud className={cn("h-8 w-8 transition-colors", bannerFile ? 'text-primary' : 'text-gray-500')} />
              <div className="text-center">
                <p className="text-sm font-bold text-gray-200">
                  {bannerFile ? bannerFile.name : "Clique para selecionar a capa"}
                </p>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">PNG ou JPG</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-400">Título do Problema *</Label>
            <Input 
              id="title" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="bg-white/5 border-white/10 text-white focus-visible:ring-primary" 
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-400">Descrição (Markdown/Texto) *</Label>
            <textarea 
              id="description" 
              rows={4}
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full flex min-h-[100px] rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-y" 
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty" className="text-gray-400">Dificuldade *</Label>
              <select
                id="difficulty"
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                <option value="EASY" className="bg-[#0a0a0b] text-emerald-400">Fácil</option>
                <option value="MEDIUM" className="bg-[#0a0a0b] text-amber-400">Médio</option>
                <option value="HARD" className="bg-[#0a0a0b] text-red-400">Difícil</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="points" className="text-gray-400">Pontuação *</Label>
              <Input 
                id="points" 
                type="number"
                min="0"
                value={formData.points} 
                onChange={(e) => setFormData({...formData, points: Number(e.target.value)})}
                className="bg-white/5 border-white/10 text-white focus-visible:ring-primary" 
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="input" className="text-gray-400">Entrada (Input de teste) *</Label>
              <textarea 
                id="input" 
                rows={3}
                value={formData.input} 
                onChange={(e) => setFormData({...formData, input: e.target.value})}
                placeholder="Ex: 2\n5 10"
                className="w-full flex min-h-[80px] font-mono rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-y" 
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer" className="text-gray-400">Saída Esperada (Answer) *</Label>
              <textarea 
                id="answer" 
                rows={3}
                value={formData.answer} 
                onChange={(e) => setFormData({...formData, answer: e.target.value})}
                placeholder="Ex: 15"
                className="w-full flex min-h-[80px] font-mono rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-emerald-400 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors resize-y" 
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t border-white/10 mt-6">
            <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-white/10 text-gray-300">
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary text-white hover:bg-primary/90">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  A guardar...
                </>
              ) : (
                "Criar Problema"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}