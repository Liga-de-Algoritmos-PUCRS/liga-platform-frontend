import { useState } from "react";
import { ProblemCard } from "@/components/problems/ProblemCard";
import { ProblemDetailsModal } from "@/components/problems/ProblemDetailsModal";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, Filter, Terminal } from "lucide-react";

const MOCK_PROBLEMS = [
  {
    title: "Soma de Dois Números",
    description: "Dado um array de inteiros, encontre os índices dos elementos que somam o valor alvo.",
    difficulty: "EASY",
    points: 100,
    resolved: 154,
    submissions: 890,
    input: "nums = [2,7,11,15], target = 9",
  },
  {
    title: "Busca em Árvore Binária",
    description: "Implemente um algoritmo de busca eficiente para encontrar um nó em uma BST.",
    difficulty: "MEDIUM",
    points: 250,
    resolved: 42,
    submissions: 310,
    input: "root = [4,2,7,1,3], val = 2",
  },
  {
    title: "Caminho Mínimo em Grafos",
    description: "Utilize Dijkstra para encontrar a menor distância entre dois pontos em um mapa de conexões.",
    difficulty: "HARD",
    points: 500,
    resolved: 12,
    submissions: 145,
    input: "edges = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2",
  },
  {
    title: "Palíndromo de Inteiros",
    description: "Verifique se um número inteiro é um palíndromo sem convertê-lo para string.",
    difficulty: "EASY",
    points: 80,
    resolved: 210,
    submissions: 1100,
    input: "x = 121",
  },
];

export function ProblemsPage() {
  const [search, setSearch] = useState("");
  const [selectedProblem, setSelectedProblem] = useState<any | null>(null);

  const filteredProblems = MOCK_PROBLEMS.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      
      {/* Glow de Fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] md:w-[95%] md:h-[95%] bg-primary/15 blur-[100px] md:blur-[200px] rounded-full animate-pulse z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold text-primary tracking-widest uppercase shadow-xl">
            <Sparkles size={12} className="animate-spin-slow" />
            <span>Biblioteca de Algoritmos</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-primary leading-none">
            PROBLEMAS
          </h1>
          <p className="text-muted-foreground mt-6 text-base md:text-lg max-w-2xl font-medium">
            Desafie sua mente. Selecione um problema e submeta sua solução para subir no ranking.
          </p>
        </div>

        {/* Barra de Busca e Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Buscar desafio..." 
              className="pl-12 h-12 bg-white/5 border-white/10 rounded-2xl focus-visible:ring-primary shadow-2xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 h-12 rounded-2xl bg-secondary/20 border border-white/10 text-sm font-bold text-gray-300 hover:bg-secondary/40 transition-all w-full md:w-auto">
             <Filter size={16} />
             Dificuldade
          </button>
        </div>

        {/* Grid de Problemas (Mais Quadrados) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {filteredProblems.map((problem, i) => (
            <ProblemCard 
              key={i} 
              problem={problem} 
              onClick={setSelectedProblem} 
            />
          ))}
        </div>

        {/* Modal de Detalhes */}
        <ProblemDetailsModal 
          problem={selectedProblem}
          isOpen={!!selectedProblem}
          onClose={() => setSelectedProblem(null)}
        />

        {/* Empty State */}
        {filteredProblems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Terminal size={48} className="text-muted-foreground/20 mb-4" />
            <h3 className="text-xl font-bold text-gray-400">Nenhum problema encontrado</h3>
          </div>
        )}
      </div>

      <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgb(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
    </div>
  );
}