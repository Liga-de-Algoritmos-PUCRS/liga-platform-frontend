import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Loader2, CheckCircle2, ArrowLeft, Mail, RotateCw } from "lucide-react"
import { toast } from "sonner"

import client from "@/api/client"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useCountdown, formatCountdown, countdownWindowMs } from "@/hooks/use-countdown"
import { otpErrorDescription } from "@/lib/otp-messages"

const OTP_LENGTH = 6
const RESEND_COOLDOWN_SECONDS = 30
// Espelha o SIGNUP_TOKEN_EXPIRES_IN_SECONDS do back; so entra em cena se o
// `expiresInSeconds` da resposta faltar.
export const SIGNUP_CODE_FALLBACK_SECONDS = 10 * 60

export interface SignupCredentials {
  name: string
  email: string
  password: string
}

interface ValidateSignupProps {
  expiresAtMs: number
  credentials: SignupCredentials
  onBack: () => void
}

export function ValidateSignup({ expiresAtMs: initialExpiresAtMs, credentials, onBack }: ValidateSignupProps) {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [otpFailures, setOtpFailures] = useState(0)
  const [expiresAtMs, setExpiresAtMs] = useState(initialExpiresAtMs)
  const [resendAvailableAt, setResendAvailableAt] = useState(() => Date.now() + RESEND_COOLDOWN_SECONDS * 1000)
  const navigate = useNavigate()

  const secondsUntilExpiry = useCountdown(expiresAtMs)
  const isOtpExpired = secondsUntilExpiry === 0
  const resendCooldown = useCountdown(resendAvailableAt)

  const handleVerify = async () => {
    if (otp.length < OTP_LENGTH || isOtpExpired) return

    setIsLoading(true)
    try {
      await client.signup.signupControllerValidateToken({
        email: credentials.email,
        token: otp,
      })

      toast.success("Conta verificada com sucesso!", {
          description: "Você já pode fazer o seu login."
      })
      navigate({ to: "/login" })
    } catch (err) {
      console.error(err)
      const failures = otpFailures + 1
      setOtpFailures(failures)
      setOtp("")
      toast.error("Código inválido", {
        description: otpErrorDescription(failures),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    try {
      const { data } = await client.signup.signupControllerValidateSignup(credentials)
      const resentAt = Date.now()
      setExpiresAtMs(resentAt + countdownWindowMs(data.expiresInSeconds, SIGNUP_CODE_FALLBACK_SECONDS))
      setResendAvailableAt(resentAt + RESEND_COOLDOWN_SECONDS * 1000)
      setOtp("")
      setOtpFailures(0)
      toast.success("Se este e-mail estiver disponível, enviamos um novo código.", {
        description: "Qualquer código anterior deixou de ser válido.",
      })
    } catch (err) {
      console.error(err)
      toast.error("Erro ao reenviar código", { description: "Tente novamente em instantes." })
    } finally {
      setIsResending(false)
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
          Se {credentials.email} estiver disponível, enviámos um código de 6 dígitos. Insira-o abaixo para continuar.
        </p>
      </div>

      <InputOTP maxLength={OTP_LENGTH} value={otp} onChange={setOtp} disabled={isOtpExpired}>
        <InputOTPGroup className="gap-2">
          <InputOTPSlot index={0} className="h-12 w-12 text-lg border-input" />
          <InputOTPSlot index={1} className="h-12 w-12 text-lg border-input" />
          <InputOTPSlot index={2} className="h-12 w-12 text-lg border-input" />
          <InputOTPSlot index={3} className="h-12 w-12 text-lg border-input" />
          <InputOTPSlot index={4} className="h-12 w-12 text-lg border-input" />
          <InputOTPSlot index={5} className="h-12 w-12 text-lg border-input" />
        </InputOTPGroup>
      </InputOTP>

      <p className="text-xs text-muted-foreground -mt-3">
        {isOtpExpired
          ? "Código expirado. Solicite um novo código."
          : `Código expira em ${formatCountdown(secondsUntilExpiry)}`}
      </p>

      <div className="w-full space-y-2">
        <Button
            onClick={handleVerify}
            className="w-full h-11 font-semibold"
            disabled={isLoading || otp.length < OTP_LENGTH || isOtpExpired}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
          Verificar Código
        </Button>

        <Button
            variant="outline"
            onClick={handleResend}
            className="w-full"
            disabled={isResending || resendCooldown > 0}
        >
          {isResending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RotateCw className="mr-2 h-4 w-4" />}
          {resendCooldown > 0 ? `Reenviar código (${resendCooldown}s)` : "Reenviar código"}
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
