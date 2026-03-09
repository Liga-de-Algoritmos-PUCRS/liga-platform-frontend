import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useNavigate } from '@tanstack/react-router';
import { Loader2, Mail, Lock } from "lucide-react" 

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label" 
import { useAuth } from "@/providers/AuthProvider"
import { ForgotPasswordModal } from "@/components/ForgotPasswordModal"

const formSchema = z.object({
  email: z.string().email("Endereço de email inválido."),
  password: z.string().min(1, "A senha é obrigatória.")
})

export function LoginForm() {
  const { login, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();
  
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/' });
    }
  }, [isAuthenticated, navigate]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await login(data)
      toast.success("Login efetuado com sucesso!")
    } catch (error) {
        console.error(error)
      toast.error("Falha ao entrar", {
        description: "Email ou senha incorretos.",
      })
    }
  }

  return (
    <>
      <form id="form-login" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="space-y-2.5">
          <Label htmlFor="email" className="text-foreground font-medium text-sm">Email</Label>
          <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    placeholder="exemplo@empresa.com"
                    className={`pl-11 h-11 text-sm bg-background text-foreground placeholder:text-muted-foreground/70 border-input focus:border-primary transition-all ${
                        form.formState.errors.email ? "border-destructive focus:border-destructive" : ""
                    }`}
                  />
                )}
              />
          </div>
          {form.formState.errors.email && (
              <p className="text-xs text-destructive font-medium ml-1">
                  {form.formState.errors.email.message}
              </p>
          )}
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-foreground font-medium text-sm">Senha</Label>
              
              <button 
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-sm text-primary hover:text-primary/80 font-medium hover:underline outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                  Esqueceu a senha?
              </button>
          </div>
          <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
              <Controller
                name="password"
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className={`pl-11 h-11 text-sm bg-background text-foreground placeholder:text-muted-foreground/70 border-input focus:border-primary transition-all ${
                        form.formState.errors.password ? "border-destructive focus:border-destructive" : ""
                    }`}
                  />
                )}
              />
          </div>
          {form.formState.errors.password && (
              <p className="text-xs text-destructive font-medium ml-1">
                  {form.formState.errors.password.message}
              </p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
              <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Entrando...
              </>
          ) : (
              "Acessar à Plataforma"
          )}
        </Button>

        <div className="text-center mt-6">
          <span className="text-sm text-muted-foreground">Não tem uma conta? </span>
          <Button 
              type="button" 
              variant="link" 
              className="p-0 h-auto font-semibold text-primary text-sm"
              onClick={() => navigate({ to: '/signup' })}
          >
              Criar conta
          </Button>
        </div>
      </form>

      <ForgotPasswordModal 
        isOpen={isForgotPasswordOpen} 
        onOpenChange={setIsForgotPasswordOpen} 
      />
    </>
  )
}