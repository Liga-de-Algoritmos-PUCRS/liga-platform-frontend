import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Terminal, Code2, Cpu, Sparkles } from "lucide-react";
import logo from "@/assets/liga-de-algoritmos.png";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-svh w-full flex flex-col items-center justify-center bg-background text-foreground font-sans overflow-hidden px-4 py-12 md:px-6 md:py-20">
      
      {/* Imagem de Fundo Imersiva */}
      <div className="absolute inset-0 z-0">
        <img
          src="/login-office.jpg"
          alt="Ambiente"
          className="h-full w-full object-cover opacity-[0.05] dark:opacity-[0.12] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Brilho Roxo Gigante e Suave */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] md:w-[95%] md:h-[95%] bg-primary/20 blur-[100px] md:blur-[200px] rounded-full animate-pulse z-0" />

      <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto w-full">
        
        {/* Badge Superior - Ajustada para Mobile */}
        <div className="mb-8 md:mb-12 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md px-4 py-1.5 md:px-5 md:py-2 text-[10px] md:text-xs font-bold text-primary tracking-widest uppercase shadow-xl">
          <Sparkles size={12} className="animate-spin-slow md:w-[14px] md:h-[14px]" />
          <span>Semestre</span>
          <span className="h-1 w-1 rounded-full bg-primary/40 mx-1" />
          <span className="opacity-70">01/2026</span>
        </div>

        {/* Bloco Central: Logo + Mensagem Lado a Lado (no Desktop) e Empilhado (no Mobile) */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-10 lg:gap-16 mb-10 md:mb-12 w-full">
          
          {/* Logo com Efeito de Profundidade */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-primary opacity-25 blur-[60px] md:blur-[100px] rounded-full w-full h-full" />
            <img 
              src={logo} 
              alt="Logo Liga" 
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(var(--primary),0.2)]"
            />
          </div>
          
          {/* Título e Frase */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-primary leading-[0.8] lg:leading-[0.85]">
              LIGA DE <br className="hidden lg:block" />
              <span className="text-foreground"> ALGORITMOS</span>
            </h1>
            <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed max-w-xl">
              Domine os algoritmos na PUCRS e prepare-se para aprender mais sobre a lógica de programação.
            </p>
          </div>
        </div>

        {/* Botões de Ação - Responsivos e sem Scale no Hover */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 items-center justify-center w-full px-4 sm:px-0">
          <Button 
            size="lg" 
            onClick={() => navigate({ to: "/problemas" })}
            className="rounded-full px-8 md:px-10 h-14 md:h-16 text-lg md:text-xl font-bold text-white bg-primary hover:bg-primary/90 transition-colors group shadow-2xl shadow-primary/30 w-full sm:w-auto"
          >
            Começar Desafio
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-2" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate({ to: "/ranking" })}
            className="rounded-full px-8 md:px-10 h-14 md:h-16 text-lg md:text-xl font-bold border-2 backdrop-blur-md w-full sm:w-auto hover:bg-primary/10 transition-colors text-foreground"
          >
            Ver Ranking
          </Button>
        </div>

        {/* Rodapé Tech - Agora em Grid no Mobile para não quebrar */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-16 text-muted-foreground/40 border-t border-primary/10 pt-8 md:pt-10 w-full max-w-4xl">
          <div className="flex flex-col items-center gap-1">
            <Terminal size={20} className="text-primary/60 md:w-6" />
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest font-bold">Otimização</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Code2 size={20} className="text-primary/60 md:w-6" />
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest font-bold">Lógica de Programação</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Cpu size={20} className="text-primary/60 md:w-6" />
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest font-bold">Estrutura de Dados</span>
          </div>
        </div>
      </div>

      {/* Grelha de Decoração */}
      <div className="absolute inset-0 z-[-1] opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(rgb(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />
    </section>
  );
}