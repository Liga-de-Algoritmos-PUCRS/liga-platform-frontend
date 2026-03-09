/* src/pages/LoginPage.tsx */
import { LoginForm } from '@/components/LoginForm'
import { Terminal, CheckCircle2 } from 'lucide-react'

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex font-sans bg-background">
            
            <div className="hidden lg:flex lg:w-1/2 relative text-white flex-col justify-between p-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-primary" />
                    <div className="absolute inset-0 bg-linear-to-br from-white/15 via-transparent to-black/60" />
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size[20px_20px]" />
                </div>

                <div className="relative z-10 flex items-center gap-2 text-white/80 font-medium tracking-wide text-sm uppercase">
                    <Terminal className="h-5 w-5" />
                    Programação Competitiva
                </div>

                <div className="relative z-10 max-w-lg">
                    <h2 className="text-5xl font-extrabold tracking-tight leading-[1.1] mb-6 drop-shadow-sm text-white">
                        Resolva problemas. <span className="text-white/70">Domine algoritmos.</span>
                    </h2>
                    <p className="text-lg text-white/90 leading-relaxed mb-8">
                        A plataforma oficial da Liga de Algoritmos da PUCRS. Prepare-se para os desafios da Maratona SBC e eleve o seu nível na resolução de problemas complexos.
                    </p>
                    
                    <ul className="space-y-4 text-white/90">
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-white/80" />
                            <span>Treinamentos focados na Maratona de Programação</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-white/80" />
                            <span>Aprimoramento em estruturas de dados e grafos</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-white/80" />
                            <span>Comunidade engajada de desenvolvedores</span>
                        </li>
                    </ul>
                </div>

                <div className="relative z-10 text-sm text-white/60">
                    © 2026 Liga de Algoritmos PUCRS. Todos os direitos reservados.
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 bg-background lg:bg-muted/30 relative">
                
                <div className="absolute inset-0 lg:hidden z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-primary" />
                    <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-black/60" />
                </div>

                <div className="w-full max-w-[400px] z-10">

                    <div className="bg-card rounded-2xl shadow-2xl lg:shadow-none lg:bg-transparent p-6 sm:p-8 border border-border lg:border-none">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
                                Bem-vindo de volta!
                            </h1>
                            <p className="text-base sm:text-lg text-muted-foreground">
                                Insira as suas credenciais para aceder à plataforma.
                            </p>
                        </div>

                        <LoginForm />
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}