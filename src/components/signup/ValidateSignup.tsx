import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Loader2, CheckCircle2, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

import client from "@/api/client"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

interface ValidateSignupProps {
  tokenId: string
  onBack: () => void
}

export function ValidateSignup({ tokenId, onBack }: ValidateSignupProps) {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleVerify = async () => {
    if (otp.length < 4) return

    setIsLoading(true)
    try {
      await client.signup.signupControllerValidateToken({
        tokenId: tokenId,
        token: otp,
      })
      
      toast.success("Conta verificada com sucesso!", {
          description: "Você já pode fazer o seu login."
      })
      navigate({ to: "/login" })
    } catch (err) {
      console.error(err)
      toast.error("Código inválido", {
        description: "O código inserido está incorreto. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
            </div>
        </div>
        <h2 className="text-xl font-semibold">Verifique o seu email</h2>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Enviámos um código de 4 dígitos para o seu email. Insira-o abaixo para continuar.
        </p>
      </div>

      <InputOTP maxLength={4} value={otp} onChange={setOtp}>
        <InputOTPGroup className="gap-2">
          <InputOTPSlot index={0} className="h-12 w-12 text-lg border-input" />
          <InputOTPSlot index={1} className="h-12 w-12 text-lg border-input" />
          <InputOTPSlot index={2} className="h-12 w-12 text-lg border-input" />
          <InputOTPSlot index={3} className="h-12 w-12 text-lg border-input" />
        </InputOTPGroup>
      </InputOTP>

      <div className="w-full space-y-2">
        <Button 
            onClick={handleVerify} 
            className="w-full h-11 font-semibold" 
            disabled={isLoading || otp.length < 4}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
          Verificar Código
        </Button>
        
        <Button 
            variant="ghost" 
            onClick={onBack}
            className="w-full text-muted-foreground"
            disabled={isLoading}
        >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
      </div>
    </div>
  )
}

import { Mail } from "lucide-react"