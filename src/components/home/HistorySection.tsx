import { Trophy, Star, Flag, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export function HistorySection() {
  const events = [
    {
      year: "2026",
      title: "Futuro e Inovação",
      description: "No primeiro semestre de 2026, a Liga de Algoritmos vive seu auge, consolidando-se como uma referência no treinamento e estudos sobre algoritmos. Com uma infraestrutura tecnológica robusta e uma comunidade vibrante, o foco atual expandiu-se para a preparação de talentos para o mercado global de tecnologia, unindo o rigor acadêmico às demandas práticas da indústria.",
      icon: <Flag size={20} className="text-white" />,
      image: "https://liga-de-algoritmos.s3.us-east-1.amazonaws.com/IMG_4683.jpeg",
    },
    {
      year: "2025",
      title: "Gestão Atual",
      description: "O segundo semestre de 2025 marcou um ponto de virada estratégico com a posse da nova gestão, que assumiu o compromisso de profissionalizar ainda mais os processos internos e ampliar o alcance da plataforma digital. Este período foi focado na transição para um modelo de governança mais ágil, estabelecendo as bases para que a Liga pudesse suportar o crescimento exponencial de membros e a integração total com o ecossistema tecnológico da universidade.",
      icon: <Star size={20} className="text-white" />,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
    },
    {
      year: "2017",
      title: "Jogos Sulamericanos",
      image: "https://liga-de-algoritmos.s3.us-east-1.amazonaws.com/WhatsApp+Image+2026-03-10+at+15.08.58.jpeg",
      icon: <Trophy size={20} className="text-white" />,
      description: "Um dos marcos históricos mais emblemáticos ocorreu em 2017, quando a dedicação dos membros foi recompensada com a classificação para a fase Sul-Americana da Maratona de Programação da SBC. Esse feito não apenas colocou a Liga no mapa das grandes instituições de computação do continente, mas também serviu como a prova que a PUCRS era capaz de competir em altíssimo nível internacional",
    },
    {
      year: "1990",
      title: "O Início",
      description: "As raízes da Liga remontam à década de 90, quando estudantes visionários e apaixonados por computação, juntamente ao Professor João Batista (JB), decidiram criar um espaço dedicado ao estudo profundo de algoritmos na PUCRS. Embora tenha passado por diversas evoluções desde sua fundação original, o espírito pioneiro daquela época permanece vivo, tendo evoluído de um pequeno grupo de estudos.",
      icon: <Rocket size={20} className="text-white" />,
    },
  ];

  return (
    <section className="relative w-full pb-24 md:pb-40 overflow-hidden bg-transparent">
      <div className="container relative z-10 mx-auto px-6">
        <div className="relative">
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

                <div className="relative z-10 flex flex-col items-center mb-6 md:mb-0">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_25px_rgba(var(--primary),0.6)] border-4 border-[#0a0a0b] transition-transform duration-300 group-hover:scale-110">
                    {event.icon}
                  </div>
                  <span className="mt-3 text-primary font-mono font-bold tracking-widest text-lg">
                    {event.year}
                  </span>
                </div>

                <div className="w-full md:w-[42%] rounded-[2rem] border border-white/5 bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-2xl transition-all hover:border-primary/20">
                  {event.image && (
                    <div className="h-40 sm:h-48 w-full overflow-hidden border-b border-white/5">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  
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
    </section>
  );
}