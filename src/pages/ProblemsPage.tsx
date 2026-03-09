import { useState, useMemo } from "react";
import { ProblemCard } from "@/components/problems/ProblemCard";
import { ProblemDetailsModal } from "@/components/problems/ProblemDetailsModal";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Sparkles, 
  Filter, 
  Terminal, 
  Hash, 
  Trophy, 
  BarChart3,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_PROBLEMS = [
  {
    id: "#ANDOAOSBF",
    title: "Soma de Dois Números",
    description: "Dado um array de inteiros, encontre os índices dos elementos que somam o valor alvo.",
    difficulty: "EASY",
    points: 100,
    resolved: 154,
    submissions: 890,
    updatedAt: "2026-03-01T10:00:00Z",
    input: "nums = [2,7,11,15], target = 9",
  },
  {
    id: "#BSTSEARCH",
    title: "Busca em Árvore Binária",
    description: "Implemente um algoritmo de busca eficiente para encontrar um nó em uma BST.",
    difficulty: "MEDIUM",
    points: 250,
    resolved: 42,
    submissions: 310,
    updatedAt: "2026-02-15T14:30:00Z",
    input: "root = [4,2,7,1,3], val = 2",
  },
  {
    id: "#DIJKSTRA",
    title: "Caminho Mínimo em Grafos",
    description: "Utilize Dijkstra para encontrar a menor distância entre dois pontos em um mapa de conexões.",
    difficulty: "HARD",
    points: 500,
    resolved: 12,
    submissions: 145,
    updatedAt: "2026-03-05T09:00:00Z",
    input: "edges = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2",
  },
  {
    id: "#PALINDROM",
    title: "Palíndromo de Inteiros",
    description: "Verifique se um número inteiro é um palíndromo sem convertê-lo para string.",
    difficulty: "EASY",
    points: 80,
    resolved: 210,
    submissions: 1100,
    updatedAt: "2026-01-20T11:00:00Z",
    input: "x = 121",
  },
];

export function ProblemsPage() {
  const [selectedProblem, setSelectedProblem] = useState<any | null>(null);
  
  const [nameFilter, setNameFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL");
  const [minPoints, setMinPoints] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProblems = useMemo(() => {
    return MOCK_PROBLEMS.filter(p => {
      const matchesName = p.title.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesId = p.id.toLowerCase().includes(idFilter.toLowerCase()) || 
                        p.id.toLowerCase().includes(`#${idFilter.toLowerCase()}`);
      const matchesDifficulty = difficultyFilter === "ALL" || p.difficulty === difficultyFilter;
      const matchesPoints = p.points >= minPoints;

      return matchesName && matchesId && matchesDifficulty && matchesPoints;
    });
  }, [nameFilter, idFilter, difficultyFilter, minPoints]);

  const clearFilters = () => {
    setNameFilter("");
    setIdFilter("");
    setDifficultyFilter("ALL");
    setMinPoints(0);
  };

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] md:w-[95%] md:h-[95%] bg-primary/15 blur-[100px] md:blur-[200px] rounded-full animate-pulse z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center text-center mb-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold text-primary tracking-widest uppercase shadow-xl">
            <Sparkles size={12} className="animate-spin-slow" />
            <span>Biblioteca de Algoritmos</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-primary leading-none uppercase">
            PROBLEMAS
          </h1>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Nome do problema..." 
                className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus-visible:ring-primary shadow-2xl"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>

            <div className="relative w-full md:w-48">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60" size={16} />
              <Input 
                placeholder="ID..." 
                className="pl-10 h-14 bg-white/5 border-white/10 rounded-2xl focus-visible:ring-primary font-mono text-sm"
                value={idFilter}
                onChange={(e) => setIdFilter(e.target.value)}
              />
            </div>

            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters ? "default" : "secondary"}
              className="h-14 px-6 rounded-2xl gap-2 font-bold w-full md:w-auto transition-all"
            >
              {showFilters ? <X size={18} /> : <Filter size={18} />}
              Filtros Avançados
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 animate-in slide-in-from-top-4 duration-300">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                  <BarChart3 size={12} />
                  Dificuldade
                </div>
                <div className="flex gap-2">
                  {["ALL", "EASY", "MEDIUM", "HARD"].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={cn(
                        "flex-1 py-2 text-[10px] font-black rounded-xl border transition-all uppercase",
                        difficultyFilter === diff 
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                          : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                      )}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                  <Trophy size={12} />
                  Mínimo de Pontos: <span className="text-primary">{minPoints}</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="500"
                  step="50"
                  value={minPoints}
                  onChange={(e) => setMinPoints(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={clearFilters}
                  variant="ghost" 
                  className="w-full h-11 text-[10px] font-bold uppercase tracking-widest hover:text-red-400 gap-2"
                >
                  Limpar todos os filtros
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-6 px-2">
          <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-md">
            {filteredProblems.length}
          </span>
          <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
            Desafios Encontrados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {filteredProblems.map((problem) => (
            <ProblemCard 
              key={problem.id} 
              problem={problem} 
              onClick={setSelectedProblem} 
            />
          ))}
        </div>

        <ProblemDetailsModal 
          problem={selectedProblem}
          isOpen={!!selectedProblem}
          onClose={() => setSelectedProblem(null)}
        />

        {filteredProblems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="p-6 rounded-full bg-white/5 border border-white/10 mb-6">
              <Terminal size={48} className="text-gray-700" />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Nenhum algoritmo encontrado</h3>
            <p className="text-gray-500 mt-2 text-sm">Tente ajustar seus filtros para encontrar outros desafios.</p>
            <Button onClick={clearFilters} variant="link" className="text-primary mt-4 font-bold">
              Limpar Filtros
            </Button>
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