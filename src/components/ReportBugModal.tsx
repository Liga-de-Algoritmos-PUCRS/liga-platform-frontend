import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Bug } from "lucide-react";
import  { toast } from "sonner";
import client from "@/api/client";

interface ReportBugModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportBugModal({ isOpen, onClose }: ReportBugModalProps) {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    setError("");

    try {
      await client.reportBug.reportBugControllerReportBug({ description });
      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000); 
    } catch {
      setError("Ocorreu um erro ao reportar o bug. Tente novamente mais tarde.");
      toast.error("Ocorreu um erro ao reportar o bug. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[425px] bg-background text-white border-white/10 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-red-400" />
            Reportar Bug
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Encontrou algum problema na plataforma? Descreva abaixo com o máximo de detalhes possível para que possamos corrigir.
          </DialogDescription>
        </DialogHeader>
        
        {success ? (
          <div className="py-6 text-center text-green-400 font-medium">
            Bug reportado com sucesso! Obrigado por ajudar a melhorar a Liga de Algoritmos.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-gray-300">Descrição do Problema</Label>
              <textarea
                id="description"
                className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white resize-y"
                placeholder="Ex: Quando tento acessar a página X, o botão Y não funciona..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={handleClose} disabled={isSubmitting} className="hover:bg-white/10 hover:text-white">
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting || !description.trim()} className="bg-primary text-white hover:bg-primary/90">
                {isSubmitting ? "Enviando..." : "Reportar"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}