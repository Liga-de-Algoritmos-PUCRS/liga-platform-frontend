import { useState } from "react";
import { Users, FileCode2, History } from "lucide-react";
import { cn } from "@/lib/utils";

import { SubmissionsTable } from "@/components/admin/SubmissionsTable";
import { UsersTable } from "@/components/admin/UsersTable";
import { ProblemsTable } from "@/components/admin/ProblemsTable";

type TabType = 'submissions' | 'users' | 'problems';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('submissions');

  return (
    <div className="container mx-auto max-w-7xl space-y-8 pt-18 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Painel Administrativo</h1>
        <p className="text-gray-400">
          Gerencie submissões, usuários e problemas da plataforma.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('submissions')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            activeTab === 'submissions' 
              ? "bg-primary text-white" 
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
        >
          <History size={18} />
          Todas as Submissões
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            activeTab === 'users' 
              ? "bg-primary text-white" 
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
        >
          <Users size={18} />
          Gerenciar Usuários
        </button>

        <button
          onClick={() => setActiveTab('problems')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            activeTab === 'problems' 
              ? "bg-primary text-white" 
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
        >
          <FileCode2 size={18} />
          Gerenciar Problemas
        </button>
      </div>

      {/* Conteúdo Dinâmico das Abas renderizando nossos novos componentes */}
      <div className="mt-6">
        {activeTab === 'submissions' && <SubmissionsTable />}
        {activeTab === 'users' && <UsersTable />}
        {activeTab === 'problems' && <ProblemsTable />}
      </div>
    </div>
  );
}