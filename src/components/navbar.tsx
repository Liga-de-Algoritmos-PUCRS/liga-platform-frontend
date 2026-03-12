import { useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  User,
  LayoutDashboard,
  Terminal,
  Trophy,
  Menu,
  Settings,
  LogOut,
  History,  
  Users,
  Bug
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";

import logo from "@/assets/liga-de-algoritmos.png";
import { ReportBugModal } from "@/components/ReportBugModal";

export function Navbar() {
  const navigate = useNavigate();
  const state = useRouterState();
  const [isOpen, setIsOpen] = useState(false);
  const [isReportBugModalOpen, setIsReportBugModalOpen] = useState(false);
  
  const { user, logout } = useAuth();

  const activeTab = state.location.pathname;

  const navItems = [
    { name: "Início", path: "/", icon: LayoutDashboard },
    { name: "História", path: "/historia", icon: History },
    { name: "Problemas", path: "/problemas", icon: Terminal },
    { name: "Ranking", path: "/ranking", icon: Trophy },
    ...(user ? [{ name: "Integrantes", path: "/authenticated/integrantes", icon: Users }] : []),
  ];

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-background/40 via-background/20 to-background/40 backdrop-blur-xl shadow-xs transition-all duration-300 text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">

        <div className="flex flex-1 items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px]  backdrop-blur-xl border-white/10 text-white">
              <SheetHeader className="mb-8 text-left">
                <SheetTitle className="flex items-center gap-3 text-white">
                  <div className="flex h-10 w-10 items-center justify-center ">
                    <img className="h-full w-full object-contain" src={logo} alt="Logo" />
                  </div>
                  <span className="font-bold tracking-tight text-lg">
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
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-300 hover:bg-secondary/50 hover:text-white"
                      )}
                    >
                      <item.icon size={18} className={isActive ? "text-white" : "text-gray-300"} />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl  transition-transform group-hover:scale-105">     
              <img className="h-full w-full object-contain drop-shadow-sm" src={logo} alt="Logo" />
            </div>
            <span className="hidden sm:inline-block font-bold text-lg sm:text-xl tracking-tight text-white">
              Liga de <span className="text-primary">Algoritmos</span>
            </span>
          </div>
        </div>

        <div className="hidden md:flex flex-none items-center bg-secondary/20 p-1.5 rounded-full border border-white/10 backdrop-blur-md gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.path;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative outline-none",
                  isActive
                    ? "bg-primary text-white shadow-sm ring-1 ring-primary/50 scale-100"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                )}
              >
                <item.icon
                  size={16}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-white" : "text-gray-300"
                  )}
                />
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 sm:gap-5">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative group cursor-pointer outline-none">
                  <Avatar className="relative h-9 w-9 sm:h-10 sm:w-10 border-2 border-transparent ring-2 ring-transparent transition-all duration-300 hover:ring-primary/50 hover:border-background shadow-sm">
                  
                    <AvatarImage src={user.avatarUrl ?? ''} alt="User profile" className="object-cover" />
                    <AvatarFallback className="bg-primary text-white">
                      <User size={18} />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 bg-background/95 backdrop-blur-xl text-white border-white/10">
                <DropdownMenuLabel className="truncate" title={user.name}>
                  {user.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white" onClick={() => navigate({ to: '/authenticated/profile' })}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Meu Perfil</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white" onClick={() => setIsReportBugModalOpen(true)}>
                  <Bug className="mr-2 h-4 w-4 text-red-400" />
                  <span>Reportar Bug</span>
                </DropdownMenuItem>

                {(user.role === 'ADMIN' || user.role === 'ROOT') && (
                  <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white" onClick={() => navigate({ to: '/authenticated/admin' })}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Gerenciar</span>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-400 hover:bg-red-500/10 hover:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => handleNavigation('/login')} className="rounded-full bg-primary text-white hover:bg-primary/90">
              Entrar
            </Button>
          )}
        </div>
        
      </div>
      
      <ReportBugModal 
        isOpen={isReportBugModalOpen} 
        onClose={() => setIsReportBugModalOpen(false)} 
      />
    </header>
  );
}