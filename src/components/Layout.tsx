import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/Button';
import { LogOut, BookOpen, Users, Code, LayoutDashboard, Menu, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

/**
 * COMPONENTE LAYOUT
 * 
 * FUNÇÃO: Envolve as páginas privadas, fornecendo navegação lateral estável.
 */
export const Layout: React.FC<{ children: React.ReactNode; title?: string; headerAction?: React.ReactNode }> = ({ children, title, headerAction }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const menu = [
    { icon: <LayoutDashboard size={18} />, label: "Geral", path: "/dashboard" },
    { icon: <BookOpen size={18} />, label: "Academia", path: "/meus-cursos" },
    { icon: <Code size={18} />, label: "Laboratório", path: "/projetos" },
    { icon: <ShieldCheck size={18} />, label: "Membros", path: "/usuarios" },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex font-sans">
      <aside className="w-64 border-r border-zinc-900 p-6 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center p-0.5"><img src="/logo.png" alt="SHF" className="object-contain" /></div>
          <span className="font-black text-xs uppercase tracking-tighter italic">Software House<br/>Fortaleza</span>
        </div>

        <nav className="space-y-1 flex-1">
          {menu.map(item => (
            <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === item.path ? 'bg-emerald-600/10 text-emerald-500' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-zinc-900">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs">{user?.email?.[0].toUpperCase()}</div>
            <div className="truncate text-xs font-medium text-zinc-400">{user?.email}</div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-xs p-2" onClick={signOut}><LogOut size={14} className="mr-2" /> Logout System</Button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-zinc-900 flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <Menu className="md:hidden text-zinc-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em] font-mono">{title}</span>
          </div>
          {headerAction}
        </header>
        <div className="p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};
