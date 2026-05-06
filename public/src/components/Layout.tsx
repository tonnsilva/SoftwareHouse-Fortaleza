/**
 * COMPONENTE DE LAYOUT (Layout Component)
 * 
 * FUNÇÃO: Este é o componente "pai" de todas as páginas autenticadas.
 * Ele fornece a barra lateral (Sidebar), o cabeçalho (Header) e gerencia o menu mobile.
 * 
 * ESTRUTURA:
 * - Desktop Sidebar: Fixa à esquerda.
 * - Mobile Sidebar: Menu lateral que "desliza" (slide) ao clicar no ícone de hambúrguer.
 * - Main: Área onde as páginas específicas (Dashboard, Cursos, etc.) são renderizadas.
 */
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/Button';
import { 
  LogOut, 
  BookOpen, 
  Users, 
  Code, 
  LayoutDashboard, 
  X, 
  Linkedin, 
  MessageCircle, 
  Gamepad2,
  Menu,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode; // Conteúdo da página atual
  title?: string;            // Título exibido no cabeçalho
  headerAction?: React.ReactNode; // Botão opcional no topo (ex: "Adicionar Novo")
}

interface NavItemProps {
  item: { icon: any, label: string, path: string };
  isActive: boolean;
  onClick: () => void;
  key?: string;
}

/**
 * COMPONENTE AUXILIAR: NavItem
 * Renderiza um link individual no menu lateral com estilos de "ativo/inativo".
 */
const NavItem = ({ item, isActive, onClick }: NavItemProps) => {
  return (
    <Link 
      to={item.path}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
        isActive 
          ? 'bg-emerald-600/10 text-emerald-500' // Estilo quando a página coincide com o link
          : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900' // Estilo padrão com hover
      }`}
      onClick={onClick}
    >
      {item.icon}
      {item.label}
    </Link>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, title = "Dashboard", headerAction }) => {
  const { user, signOut } = useAuth();
  const location = useLocation(); // Hook para saber em qual URL estamos
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // LISTA DE NAVEGAÇÃO Principal
  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", path: "/dashboard" },
    { icon: <BookOpen size={18} />, label: "Meus Cursos", path: "/meus-cursos" },
    { icon: <Code size={18} />, label: "Projetos", path: "/projetos" },
    { icon: <Users size={18} />, label: "Comunidade", path: "/comunidade" },
    { icon: <ShieldCheck size={18} />, label: "Usuários", path: "/usuarios" },
  ];

  // LINKS Externos/Redes Sociais
  const socialLinks = [
    { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://linkedin.com", color: "hover:text-blue-400" },
    { icon: <MessageCircle size={18} />, label: "WhatsApp", href: "https://wa.me/5500000000000", color: "hover:text-green-400" },
    { icon: <Gamepad2 size={18} />, label: "Discord", href: "https://discord.gg", color: "hover:text-indigo-400" },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex selection:bg-emerald-500/30">
      {/* MOBILE MENU: Overlay Escuro */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR: Menu Lateral que desliza */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-zinc-950 border-r border-zinc-900 z-50 p-6 md:hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center p-0.5 overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-sm tracking-tight text-white leading-tight">Software House<br />Fortaleza</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-500">
                <X size={20} />
              </button>
            </div>
            
            <nav className="space-y-1">
              {navItems.map(item => (
                <NavItem 
                  key={item.path} 
                  item={item} 
                  isActive={location.pathname === item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </nav>

            <div className="mt-8 space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold px-3 text-white/50">Redes Sociais</h4>
              <div className="space-y-1">
                {socialLinks.map(social => (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-3 py-2 text-sm text-zinc-500 transition-colors ${social.color}`}
                  >
                    {social.icon}
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-zinc-900">
               <Button variant="ghost" className="w-full justify-start text-zinc-500" onClick={signOut}>
                <LogOut size={16} className="mr-2" /> Sair
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR: Sidebar Fixa para telas grandes */}
      <aside className="w-64 border-r border-zinc-900 flex flex-col p-6 hidden md:flex sticky top-0 h-screen bg-black/40">
        {/* LOGO E TÍTULO */}
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center shadow-lg shadow-emerald-900/20 p-0.5 overflow-hidden">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white italic leading-tight">Software House<br />Fortaleza</span>
        </div>

        {/* NAVEGAÇÃO Principal */}
        <nav className="space-y-1 flex-1">
          {navItems.map(item => (
            <NavItem 
              key={item.path} 
              item={item} 
              isActive={location.pathname === item.path}
              onClick={() => {}}
            />
          ))}
        </nav>

        {/* MÍDIAS SOCIAIS */}
        <div className="mb-8 space-y-4">
          <h4 className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold px-3">Conecte-se</h4>
          <div className="space-y-1">
            {socialLinks.map(social => (
              <a 
                key={social.label} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-3 py-2 text-sm text-zinc-500 transition-colors ${social.color}`}
              >
                {social.icon}
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* PERFIL DO USUÁRIO E LOGOUT */}
        <div className="pt-6 border-t border-zinc-900">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-sm font-bold border border-emerald-500/20 shadow-xl text-white">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate text-white">{user?.email?.split('@')[0]}</p>
              <p className="text-[10px] text-zinc-500 truncate lowercase">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all" onClick={signOut}>
            <LogOut size={16} className="mr-2" /> Sair do Sistema
          </Button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL (Main Content) */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER: Barra superior com título da página */}
        <header className="h-16 border-b border-zinc-900 flex items-center justify-between px-4 md:px-8 bg-black/60 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4">
            {/* Ícone de menu hambúrguer visível apenas no mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-zinc-400 hover:text-white md:hidden"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Workspace / {title}</h2>
          </div>
          <div className="flex items-center gap-4">
            {headerAction}
          </div>
        </header>

        {/* ÁREA DE SCROLL: Onde as páginas são renderizadas */}
        <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};
