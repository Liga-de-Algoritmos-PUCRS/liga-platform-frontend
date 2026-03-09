import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Mail, KeyRound, Lock, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

import client from "@/api/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const emailSchema = z.object({
  email: z.string().email("Insira um email válido"),
})

const passwordSchema = z.object({
  password: z.string().min(6, "A senha deve ter no mínimo 8 caracteres")
    .min(9, "A senha deve ter mais de 8 caracteres.")
    .regex(/[A-Z]/, "Deve conter letra maiúscula.")
    .regex(/[a-z]/, "Deve conter letra minúscula.")
    .regex(/\d/, "Deve conter um número.")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Deve conter um símbolo (!@#$...)."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

interface ForgotPasswordModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

type Step = "EMAIL" | "OTP" | "NEW_PASSWORD"

export function ForgotPasswordModal({ isOpen, onOpenChange }: ForgotPasswordModalProps) {
  const [step, setStep] = useState<Step>("EMAIL")
  const [isLoading, setIsLoading] = useState(false)
  const [tokenId, setTokenId] = useState("")
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
  })

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  })

  const handleRequestReset = async (data: z.infer<typeof emailSchema>) => {
    setIsLoading(true)
    try {
      const response = await client.resetPassword.resetPasswordControllerRequestResetPassword({
        email: data.email,
      })
      
      if (response.data.id) {
        setTokenId(response.data.id)
        setEmail(data.email)
        setStep("OTP")
        toast.success("Código enviado!", { description: "Verifique sua caixa de entrada." })
      }
    } catch (error) {
      console.error(error)
      toast.error("Erro ao solicitar recuperação", { description: "Verifique o email e tente novamente." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (otp.length < 4) return
    setIsLoading(true)
    try {
      await client.resetPassword.resetPasswordControllerValidateResetPassword({
        tokenId: tokenId,
        token: otp,
      })
      
      setStep("NEW_PASSWORD")
      toast.success("Código validado!")
    } catch (error) {
      console.error(error)
      toast.error("Código inválido", { description: "Tente novamente." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (data: z.infer<typeof passwordSchema>) => {
    setIsLoading(true)
    try {
      await client.resetPassword.resetPasswordControllerResetPassword({
        tokenId: tokenId,
        token: otp,
        newPassword: data.password,
      })

      toast.success("Senha alterada com sucesso!", { description: "Faça login com sua nova senha." })
      handleClose()
    } catch (error) {
      console.error(error)
      toast.error("Erro ao alterar senha")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      setStep("EMAIL")
      setOtp("")
      emailForm.reset()
      passwordForm.reset()
    }, 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">Recuperar Senha</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === "EMAIL" && "Insira seu email para receber o código de recuperação."}
            {step === "OTP" && `Enviamos um código de 4 dígitos para ${email}.`}
            {step === "NEW_PASSWORD" && "Crie uma nova senha segura para sua conta."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {step === "EMAIL" && (
            <form onSubmit={emailForm.handleSubmit(handleRequestReset)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-foreground font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                  <Input
                    {...emailForm.register("email")}
                    id="reset-email"
                    placeholder="seu@email.com"
                    className="pl-10 h-11 bg-background text-foreground placeholder:text-muted-foreground/70 border-input focus:border-primary transition-all"
                  />
                </div>
                {emailForm.formState.errors.email && (
                  <p className="text-xs text-destructive font-medium ml-1">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm transition-all cursor-pointer" 
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Enviar Código"}
              </Button>
            </form>
          )}

          {step === "OTP" && (
            <div className="flex flex-col items-center space-y-6 animate-in fade-in slide-in-from-right-4">
              <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="h-12 w-12 text-lg border-input bg-background text-foreground shadow-sm" />
                  <InputOTPSlot index={1} className="h-12 w-12 text-lg border-input bg-background text-foreground shadow-sm" />
                  <InputOTPSlot index={2} className="h-12 w-12 text-lg border-input bg-background text-foreground shadow-sm" />
                  <InputOTPSlot index={3} className="h-12 w-12 text-lg border-input bg-background text-foreground shadow-sm" />
                </InputOTPGroup>
              </InputOTP>
              
              <div className="w-full space-y-2">
                <Button 
                  onClick={handleVerifyOtp} 
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm transition-all cursor-pointer" 
                  disabled={isLoading || otp.length < 4}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verificar Código"}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full h-11 text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer" 
                  onClick={() => setStep("EMAIL")} 
                  disabled={isLoading}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                </Button>
              </div>
            </div>
          )}

          {step === "NEW_PASSWORD" && (
            <form onSubmit={passwordForm.handleSubmit(handleResetPassword)} className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-foreground font-medium">Nova Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                  <Input
                    {...passwordForm.register("password")}
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-11 bg-background text-foreground placeholder:text-muted-foreground/70 border-input focus:border-primary transition-all"
                  />
                </div>
                {passwordForm.formState.errors.password && (
                  <p className="text-xs text-destructive font-medium ml-1">
                    {passwordForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-foreground font-medium">Confirmar Senha</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                  <Input
                    {...passwordForm.register("confirmPassword")}
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-11 bg-background text-foreground placeholder:text-muted-foreground/70 border-input focus:border-primary transition-all"
                  />
                </div>
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="text-xs text-destructive font-medium ml-1">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm transition-all cursor-pointer" 
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Redefinir Senha"}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}