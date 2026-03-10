import { HistorySection } from "@/components/home/HistorySection";
import { Sparkles } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="relative min-h-screen bg-background pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] md:w-[95%] md:h-[95%] bg-pink-500/20 blur-[100px] md:blur-[200px] rounded-full animate-pulse z-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold text-primary tracking-widest uppercase shadow-xl">
          <Sparkles size={12} className="animate-spin-slow" />
          <span>Nossa Trajetória</span>
          <span className="h-1 w-1 rounded-full bg-primary/40 mx-1" />
          <span className="opacity-70">Desde 2024</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-fuchsia-700 leading-none uppercase">
            Nossa História
          </h1>
          <p className="text-muted-foreground mt-6 text-base md:text-xl font-medium max-w-2xl mx-auto">
            Conheça as origens, os desafios e a evolução da Liga de Algoritmos.
          </p>
        </div>

        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
          <HistorySection />
        </div>
      </div>

      <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgb(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
    </div>
  );
}