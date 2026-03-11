import { Target, Zap, Users, Brain } from "lucide-react";

export function PurposeSection() {
  const purposes = [
    {
      icon: <Brain className="text-white" size={32} />,
      title: "Excelência Algorítmica",
      description: "Aprofundamos o conhecimento em estruturas de dados e otimização ."
    },
    {
      icon: <Target className="text-white" size={32} />,
      title: "Foco em Competição",
      description: "Treinos intensivos para a Maratona de Programação da SBC e competições."
    },
    {
      icon: <Zap className="text-white" size={32} />,
      title: "Desafios Reais",
      description: "Preparação para entrevistas técnicas em Big Techs e resolução de problemas de entrevistas."
    },
    {
      icon: <Users className="text-white" size={32} />,
      title: "Comunidade Ativa",
      description: "Um ambiente de colaboração entre estudantes da PUCRS apaixonados por resolver problemas."
    }
  ];

  return (
    <section className="relative w-full py-24 md:py-32 bg-background overflow-hidden">
      
     
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-80 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 z-0" />

      <div className="absolute top-20 left-0 w-[70%] h-[70%] bg-primary/10 blur-[180px] md:blur-[280px] rounded-full -translate-x-1/4 -translate-y-1/4 z-0" />
      <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-primary/10 blur-[150px] md:blur-[220px] rounded-full translate-x-1/4 translate-y-1/4 z-0" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2 className="text-sm font-bold tracking-[0.2em] text-white uppercase mb-4 opacity-70">
            O que nos move
          </h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight tex">
            Transformamos lógica em <span className="text-fuchsia-600 drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">impacto tecnológico</span>.
          </h3>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
           Além de código, construímos pontes: um ecossistema de networking entre os alunos da PUCRS movidos por desafios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {purposes.map((item, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-1000 ease-out hover:border-primary/30 hover:bg-primary/[0.05] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
              
              <div className="relative z-10">
                <div className="mb-8 p-3 w-fit rounded-2xl bg-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-transform duration-700 group-hover:scale-105">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">
                  {item.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base group-hover:text-gray-300 transition-colors duration-700">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-[-1] opacity-[0.015]" style={{
        backgroundImage: "radial-gradient(rgb(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />
    </section>
  );
}