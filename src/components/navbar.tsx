import { useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Sun,
  Moon,
  User,
  LayoutDashboard,
  Terminal,
  Trophy
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useColor } from "@/providers/ColorProvider";

export function Navbar() {
  const { setTheme, resolvedTheme } = useColor();
  const navigate = useNavigate();
  const state = useRouterState();

  // Estado local para permitir a seleção visual enquanto você não tem as rotas físicas
  // Quando você tiver as rotas, o 'activePath' pode ser apenas state.location.pathname
  const [activeTab, setActiveTab] = useState(state.location.pathname);

  const navItems = [
    { name: "Início", path: "/", icon: LayoutDashboard },
    { name: "Problemas", path: "/problemas", icon: Terminal },
    { name: "Ranking", path: "/ranking", icon: Trophy },
  ];

  const handleNavigation = (path: string) => {
    setActiveTab(path); // Atualiza visualmente o botão selecionado
    navigate({ to: path });
  };

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">

        {/* ESQUERDA: Logo */}
        <div
          className="flex items-center gap-2.5 group cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-all group-hover:scale-105 group-active:scale-95">
            <img
              className="w-24"
              src="/src/assets/liga-de-algoritmos-clean.png"
            />
          </div>
          <span className="hidden font-bold text-xl tracking-tight sm:inline-block">
            Liga de <span className="text-primary">Algoritmos</span>
          </span>
        </div>

        {/* MEIO: Navegação TanStack Style */}
        <nav className="hidden md:flex items-center bg-secondary/50 p-1.5 rounded-full border border-border/50 shadow-inner">
          {navItems.map((item) => {
            const isActive = activeTab === item.path;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative outline-none",
                  isActive
                    ? "bg-background text-foreground shadow-md ring-1 ring-black/5 dark:ring-white/10 scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                )}
              >
                <item.icon
                  size={16}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* DIREITA: Switch e User */}
        <div className="flex items-center gap-5">

          {/* Theme Switch Personalizado */}
          <div className="flex items-center gap-3 bg-secondary/30 px-3 py-1.5 rounded-full border border-border/40">
            <Sun className={cn(
              "h-4 w-4 transition-all duration-500",
              resolvedTheme === 'light' ? "text-orange-500 rotate-0 scale-110" : "text-muted-foreground opacity-40 -rotate-90 scale-90"
            )} />
            <Switch
              checked={resolvedTheme === "dark"}
              onCheckedChange={handleThemeChange}
            />
            <Moon className={cn(
              "h-4 w-4 transition-all duration-500",
              resolvedTheme === 'dark' ? "text-primary rotate-0 scale-110" : "text-muted-foreground opacity-40 rotate-90 scale-90"
            )} />
          </div>

          <div className="h-8 w-[px] bg-border/60" />

          <div className="relative group cursor-pointer">
            <div className="absolute -inset-0.5 rounded-full bg-linear-to-tr from-primary to-primary opacity-0 group-hover:opacity-70 transition duration-500 blur-md" />
            <Avatar className="relative h-10 w-10 border-2 border-background ring-1 ring-border transition-transform group-active:scale-90">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-muted">
                <User size={20} />
              </AvatarFallback>
            </Avatar>
          </div>

        </div>
      </div>
    </header>
  );
}