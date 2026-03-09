import { useState } from "react";
import { RankingTable } from "@/components/ranking/RankingTable";
import { Button } from "@/components/ui/button";
import { Calendar, Globe2, Trophy, Sparkles } from "lucide-react";

export function RankingPage() {
  const [view, setView] = useState<"monthly" | "alltime">("monthly");

  // Dados Mockados para os 10 usuários
  const monthlyData = [
    { rank: 1, name: "Guilherme Cassol", score: 2450 },
    { rank: 2, name: "Bernardo Kirsch", score: 2320 },
    { rank: 3, name: "Eduardo Paz", score: 2100 },
    { rank: 4, name: "Alice Silva", score: 1950 },
    { rank: 5, name: "Bruno Souza", score: 1800 },
    { rank: 6, name: "Carla Dias", score: 1750 },
    { rank: 7, name: "Daniel Ohms", score: 1600 },
    { rank: 8, name: "Elena Ramos", score: 1450 },
    { rank: 9, name: "Fabio Lima", score: 1300 },
    { rank: 10, name: "Gisele Voss", score: 1150 },
  ];

  const allTimeData = [
    { rank: 1, name: "Bernardo Kirsch", score: 15400 },
    { rank: 2, name: "Guilherme Cassol", score: 14200 },
    { rank: 3, name: "Eduardo Paz", score: 12800 },
    { rank: 4, name: "Daniel Ohms", score: 11500 },
    { rank: 5, name: "Alice Silva", score: 10200 },
    { rank: 6, name: "Bruno Souza", score: 9800 },
    { rank: 7, name: "Gisele Voss", score: 8700 },
    { rank: 8, name: "Carla Dias", score: 7500 },
    { rank: 9, name: "Fabio Lima", score: 6200 },
    { rank: 10, name: "Elena Ramos", score: 5400 },
  ];

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      
      {/* Brilho Roxo de Fundo (Shadow) - Seguindo o estilo da Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] md:w-[95%] md:h-[95%] bg-primary/15 blur-[100px] md:blur-[200px] rounded-full animate-pulse z-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Badge Superior */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold text-primary tracking-widest uppercase shadow-xl">
          <Sparkles size={12} className="animate-spin-slow" />
          <span>Competição</span>
          <span className="h-1 w-1 rounded-full bg-primary/40 mx-1" />
          <span className="opacity-70">Temporada 2026</span>
        </div>

        {/* Título Estilizado */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-primary leading-none">
            RANKING
          </h1>
          <p className="text-muted-foreground mt-6 text-base md:text-xl font-medium max-w-2xl mx-auto">
            Os mestre da lógica. Acompanhe a evolução dos competidores da Liga.
          </p>
        </div>

        {/* Seleção de Ranking (Tabs) */}
        <div className="flex p-1.5 bg-secondary/20 rounded-full border border-white/10 backdrop-blur-md mb-10 w-full max-w-md shadow-2xl">
          <button
            onClick={() => setView("monthly")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              view === "monthly" 
                ? "bg-primary text-white shadow-lg shadow-primary/30 scale-100" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Calendar size={16} />
            Mensal
          </button>
          <button
            onClick={() => setView("alltime")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              view === "alltime" 
                ? "bg-primary text-white shadow-lg shadow-primary/30 scale-100" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Globe2 size={16} />
            Geral
          </button>
        </div>

        {/* Tabela de Resultados */}
        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
          <RankingTable data={view === "monthly" ? monthlyData : allTimeData} />
        </div>

        {/* Rodapé da Página / CTA */}
        <div className="mt-16 w-full max-w-3xl p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
            <Trophy size={32} />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white">Quer aparecer aqui?</h4>
            <p className="text-muted-foreground">
              Resolva os problemas semanais e suba no ranking através de submissões eficientes.
            </p>
          </div>
          <Button 
            size="lg"
            className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold"
          >
            Ver Problemas
          </Button>
        </div>

      </div>

      {/* Grelha de Decoração (Opcional, para manter o padrão da Hero) */}
      <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgb(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
    </div>
  );
}