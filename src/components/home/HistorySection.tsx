import { Trophy, Star, Flag, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export function HistorySection() {
  const events = [
    {
      year: "2026",
      title: "Futuro e Inovação",
      description: "Consolidação como referência em algoritmos e preparação de elite para o mercado global.",
      icon: <Flag size={20} className="text-white" />,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    },
    {
      year: "2024",
      title: "Expansão Digital",
      description: "Lançamento da plataforma oficial de treinos e integração com o ecossistema tech da PUCRS.",
      icon: <Star size={20} className="text-white" />,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
    },
    {
      year: "2023",
      title: "Primeiros Pódios",
      description: "Destaque regional na Maratona de Programação da SBC e crescimento da comunidade acadêmica.",
      icon: <Trophy size={20} className="text-white" />,
      image: "https://images.unsplash.com/photo-1523240715630-991e2e706e0c?auto=format&fit=crop&q=80&w=1200",
    },
    {
      year: "2022",
      title: "O Início",
      description: "Fundação da Liga por estudantes apaixonados, focados em criar um polo de excelência na PUCRS.",
      icon: <Rocket size={20} className="text-white" />,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
    },
  ];

  return (
    // mt-16 compensa a altura da Navbar (h-16)
    // pt-10 deixa o título próximo da Navbar como na foto
    <section className="relative w-full mt-16 pt-10 pb-24 md:pb-40 bg-background overflow-hidden">
      
      {/* --- Efeitos de Fundo --- */}
      <div className="absolute top-1/2 left-0 w-[50%] h-[50%] bg-primary/15 blur-[150px] md:blur-[250px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-primary/10 blur-[120px] md:blur-[200px] rounded-full translate-x-1/2 translate-y-1/2 z-0" />

      <div className="container relative z-10 mx-auto px-6">
        
        {/* Cabeçalho - Espaço mb-12 reduzido para puxar a timeline para cima */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto mb-12 md:mb-16"
        >
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-white leading-none whitespace-nowrap uppercase">
            Nossa <span className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">História</span>
          </h3>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-primary/50 hidden md:block" />

          <div className="space-y-12 md:space-y-20">
            {events.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`flex flex-col md:flex-row items-center justify-between w-full group ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden md:block w-[42%]" />

                {/* Marcador Central */}
                <div className="relative z-10 flex flex-col items-center mb-6 md:mb-0">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_25px_rgba(var(--primary),0.6)] border-4 border-background transition-transform duration-300 group-hover:scale-110">
                    {event.icon}
                  </div>
                  <span className="mt-3 text-primary font-mono font-bold tracking-widest text-lg">
                    {event.year}
                  </span>
                </div>

                {/* Card com Foto Fixa */}
                <div className="w-full md:w-[42%] rounded-[2rem] border border-white/5 bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-2xl transition-all hover:border-primary/20">
                  <div className="h-40 sm:h-48 w-full overflow-hidden border-b border-white/5">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2">
                      {event.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 z-[-1] opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(rgb(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />
    </section>
  );
}