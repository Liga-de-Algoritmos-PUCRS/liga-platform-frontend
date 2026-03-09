import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Mail, Lock, User, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "@tanstack/react-router"

import client from "@/api/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string()
    .email("Endereço de email inválido.")
    .regex(/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?pucrs\.br$/i, "Deve ser um email acadêmico PUCRS"),
  password: z.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .regex(/[A-Z]/, "Deve conter letra maiúscula.")
    .regex(/[a-z]/, "Deve conter letra minúscula.")
    .regex(/\d/, "Deve conter um número.")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Deve conter um símbolo (!@#$...)."),
})

type FormValues = z.infer<typeof formSchema>

export function SignupForm({ onSuccess }: { onSuccess: (tokenId: string) => void }) {
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  })

  async function onSubmit(values: FormValues) {
    try {
      const { data } = await client.signup.signupControllerValidateSignup(values)
      if (data.id) {
        toast.success("Conta criada! Verifique o seu email.")
        onSuccess(data.id)
      }
    } catch (error) {
      console.log(error)
      toast.error("Erro ao criar conta", { description: "Verifique os dados e tente novamente." })
    }
  }

  const fields = [
    { id: "name", label: "Nome Completo", icon: User, type: "text", placeholder: "João Silva" },
    { id: "email", label: "Email", icon: Mail, type: "email", placeholder: "exemplo@edu.pucrs.br" },
    { id: "password", label: "Senha", icon: Lock, type: "password", placeholder: "••••••••" },
  ] as const

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {fields.map(({ id, label, icon: Icon, type, placeholder }) => (
        <div key={id} className="space-y-2">
          <Label htmlFor={id} className="text-foreground font-medium text-sm">{label}</Label>
          <div className="relative">
            <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
            <Input
              id={id}
              type={type}
              placeholder={placeholder}
              {...register(id)}
              className={`pl-11 h-11 text-sm bg-background text-foreground placeholder:text-muted-foreground/70 border-input focus:border-primary transition-all ${
                errors[id] ? "border-destructive focus:border-destructive" : ""
              }`}
            />
          </div>
          {errors[id] && (
            <p className="text-xs text-destructive font-medium ml-1">{errors[id]?.message}</p>
          )}
        </div>
      ))}

      <Button 
        type="submit" 
        className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-white font-semibold shadow-md hover:shadow-lg transition-all mt-4 cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> A criar conta...</> : <><Loader2 className="mr-2 h-5 w-5 hidden" /> Criar Conta <ArrowRight className="ml-2 h-5 w-5" /></>}
      </Button>

      <div className="text-center mt-5">
        <span className="text-sm text-muted-foreground">Já tem uma conta? </span>
        <Button 
            type="button" 
            variant="link" 
            className="p-0 h-auto font-semibold text-primary text-sm"
            onClick={() => navigate({ to: "/login" })}
        >
            Entrar
        </Button>
      </div>
    </form>
  )
}