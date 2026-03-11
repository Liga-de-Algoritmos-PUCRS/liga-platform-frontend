import { Instagram, Linkedin, Github, Mail } from "lucide-react";
import logo from "@/assets/liga-de-algoritmos.png";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: "Instagram", 
      icon: Instagram, 
      href: "https://www.instagram.com/ligadealgoritmos/", 
      color: "hover:text-pink-500" 
    },
    { 
      name: "LinkedIn", 
      icon: Linkedin, 
      href: "https://www.linkedin.com/company/liga-de-algoritmos", 
      color: "hover:text-blue-500" 
    },
    { 
      name: "GitHub", 
      icon: Github, 
      href: "https://github.com/Liga-de-Algoritmos-PUCRS", 
      color: "hover:text-white" 
    },
    { 
      name: "Email", 
      icon: Mail, 
      href: "mailto:contato@liga.pucrs.br", 
      color: "hover:text-primary" 
    },
  ];

  return (
    <footer className="w-full border-t border-white/10 bg-background/50 backdrop-blur-md py-10">
      <div className="container mx-auto px-4 flex flex-col items-center gap-8">
        
        <div className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center ">
                    <img className="h-full w-full object-contain" src={logo} alt="Logo" />
            </div>
                  <span className="font-bold tracking-tight text-lg">
                    Liga de <span className="text-primary">Algoritmos</span>
                  </span>
        </div>

        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-full bg-white/5 border border-white/10 transition-all duration-300 group ${social.color} hover:bg-white/10 hover:-translate-y-1`}
              aria-label={social.name}
            >
              <social.icon size={18} className="transition-transform group-hover:scale-110" />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 text-[10px] md:text-xs text-muted-foreground font-mono opacity-60">
          <p>© {currentYear} Liga de Algoritmos PUCRS.</p>
          <span className="hover:text-primary transition-colors cursor-default">
            Desenvolvido com 💜 por Bernardo Kirsch e Guilherme Cassol
          </span>
        </div>
        
      </div>
    </footer>
  );
}