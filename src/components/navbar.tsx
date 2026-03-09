import { useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Sun,
  Moon,
  User,
  LayoutDashboard,
  Terminal,
  Trophy,
  Menu,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider"; // Importação do hook de tema

export function Navbar() {
  const { setTheme, theme } = useTheme(); // Utilizando o contexto do ThemeProvider
  const navigate = useNavigate();
  const state = useRouterState();
  const [isOpen, setIsOpen] = useState(false);

  const activeTab = state.location.pathname;

  const navItems = [
    { name: "Início", path: "/", icon: LayoutDashboard },
    { name: "Problemas", path: "/problemas", icon: Terminal },
    { name: "Ranking", path: "/ranking", icon: Trophy },
  ];

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setIsOpen(false);
  };

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light"); // Atualiza o tema via provider
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">

        {/* ESQUERDA: Logo e Menu Mobile */}
        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-75 sm:w-87.5">
              <SheetHeader className="mb-8 text-left">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                    <img className="w-8" src="/src/assets/liga-de-algoritmos-clean.png" alt="Logo" />
                  </div>
                  <span className="font-bold tracking-tight">
                    Liga de <span className="text-primary">Algoritmos</span>
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = activeTab === item.path;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.path)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-muted-foreground hover:bg-secondary/50"
                      )}
                    >
                      <item.icon size={18} />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <div
            className="flex items-center gap-2.5 group cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-all group-hover:scale-105">
              <img className="w-24" src="/src/assets/liga-de-algoritmos-clean.png" />
            </div>
            <span className="hidden sm:inline-block font-bold text-lg sm:text-xl tracking-tight">
              Liga de <span className="text-primary">Algoritmos</span>
            </span>
          </div>
        </div>

        {/* MEIO: Navegação Desktop */}
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

        {/* DIREITA: Switch de Tema e Perfil */}
        <div className="flex items-center gap-2 sm:gap-5">
          <div className="flex items-center gap-2 sm:gap-3 bg-secondary/30 px-2 sm:px-3 py-1.5 rounded-full border border-border/40">
            <Sun className={cn(
              "h-3.5 w-3.5 sm:h-4 transition-all duration-500",
              theme === 'light' ? "text-orange-500 scale-110" : "text-muted-foreground opacity-40"
            )} />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={handleThemeChange}
              className="scale-75 sm:scale-100"
            />
            <Moon className={cn(
              "h-3.5 w-3.5 sm:h-4 transition-all duration-500",
              theme === 'dark' ? "text-primary scale-110" : "text-muted-foreground opacity-40"
            )} />
          </div>

          <div className="hidden xs:block h-8 w-px bg-border/60" />

          <div className="relative group cursor-pointer">
            <div className="absolute -inset-0.5 rounded-full bg-primary opacity-0 group-hover:opacity-50 transition duration-500 blur-md" />
            <Avatar className="relative h-9 w-9 sm:h-10 sm:w-10 border-2 border-background ring-1 ring-border transition-transform group-active:scale-90">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-muted">
                <User size={18} />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}