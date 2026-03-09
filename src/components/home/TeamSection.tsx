import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function TeamSection() {
  const team = [
    { 
      name: "Guilherme Cassol", 
      role: "Presidente", 
      highlight: true,
      points: [
        "Desenvolvedor Fullstack",
        "Atuando na OryzaLabs",
        "Competidor ativo em maratonas de programação"
      ] 
    },
    { 
      name: "Bernardo Kirsch", 
      role: "Vice-Presidente", 
      highlight: true,
      points: [
        "Desenvolvedor Backend focado em Cloud",
        "Atua como Devops na OryzaLabs",
        "Compete com o time TCHE++"
      ]
    },
    { 
      name: "Eduardo Paz", 
      role: "Vice-Presidente", 
      highlight: true,
      points: [
        "Especialista de Produto focado em Growth",
        "Atuando na KorzaApp com vendas",
        "O líder de produto"
      ]
    },
  ];

  return (
    <section className="min-h-svh flex flex-col items-center justify-center p-8 bg-muted/30 py-24 border-t border-border/50">
      <div className="container mx-auto max-w-6xl w-full text-center">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12 text-primary">
          INTEGRANTES 2026/01
        </h2>
        
        <div className="relative mb-20 group">
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://liga-de-algoritmos.s3.us-east-1.amazonaws.com/IMG_4683.jpeg" 
              alt="Equipe da Liga de Algoritmos" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12 text-primary">
          GESTÃO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((membro) => (
            <Card 
              key={membro.name} 
              className={`flex flex-col bg-background/40 backdrop-blur-sm border-white/10 transition-all duration-300 hover:-translate-y-2 py-8 ${
                membro.highlight ? 'md:scale-105 border-primary/50 shadow-xl' : 'hover:shadow-md'
              }`}
            >
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold">{membro.name}</CardTitle>
                <CardDescription className="text-primary font-semibold uppercase tracking-widest text-xs mt-1">
                  {membro.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-4 text-left">
                  {membro.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-tight">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}