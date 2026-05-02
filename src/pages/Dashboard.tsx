import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { LogOut, BookOpen, Users, Code, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  const mockCourses = [
    { title: 'Fullstack Next.js 14', progress: 75, instructor: 'SHF Staff' },
    { title: 'Arquitetura de Software', progress: 30, instructor: 'Fortaleza Dev' },
    { title: 'UI/UX com Tailwind v4', progress: 95, instructor: 'Design Hub' }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex selection:bg-indigo-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-900 flex flex-col p-6 hidden md:flex">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
            <span className="font-bold text-xs">SHF</span>
          </div>
          <span className="font-bold text-sm tracking-tight">SoftwareHouse</span>
        </div>

        <nav className="space-y-1 flex-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <NavItem icon={<BookOpen size={18} />} label="Meus Cursos" />
          <NavItem icon={<Code size={18} />} label="Projetos" />
          <NavItem icon={<Users size={18} />} label="Comunidade" />
        </nav>

        <div className="pt-6 border-t border-zinc-900 mt-auto">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-sm font-bold">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.email?.split('@')[0]}</p>
              <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-zinc-500" onClick={signOut}>
            <LogOut size={16} className="mr-2" /> Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-zinc-900 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-sm font-semibold text-zinc-400">Página Inicial / Dashboard</h2>
          <div className="flex items-center gap-4">
             <Button variant="outline" size="sm" className="h-9">Suporte</Button>
             <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
               <span className="text-xs">🔔</span>
             </div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-3xl font-bold mb-2">Bem-vindo, Player.</h1>
            <p className="text-zinc-500">Continue seus estudos de onde parou.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {mockCourses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500/30 hover:bg-zinc-900/60 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                   <div className="p-2 bg-indigo-600/10 rounded-lg text-indigo-400 group-hover:scale-110 transition-transform">
                     <Code size={20} />
                   </div>
                   <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{course.instructor}</span>
                </div>
                <h3 className="font-semibold text-lg mb-4">{course.title}</h3>
                <div className="space-y-2">
                   <div className="flex justify-between text-xs text-zinc-500 mb-1">
                     <span>Progresso</span>
                     <span>{course.progress}%</span>
                   </div>
                   <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                     <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-indigo-600 rounded-full"
                     />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                   <LayoutDashboard className="text-zinc-600" />
                </div>
                <h4 className="text-zinc-100 font-medium mb-2">Sem aulas agendadas para hoje</h4>
                <p className="text-zinc-600 text-sm max-w-xs">Aproveite para colocar seus projetos em dia.</p>
             </div>
             <div className="bg-gradient-to-br from-indigo-950/20 to-transparent border border-indigo-500/10 rounded-2xl p-8 min-h-[300px]">
                <h4 className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-6">Próximos passos</h4>
                <div className="space-y-6">
                   <Step completed title="Configurar ambiente" />
                   <Step active title="Implementar Auth Module" />
                   <Step title="Desploy de produção" />
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${active ? 'bg-indigo-600/10 text-indigo-400' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'}`}>
    {icon}
    {label}
  </div>
);

const Step = ({ title, completed = false, active = false }: { title: string, completed?: boolean, active?: boolean }) => (
  <div className="flex items-center gap-4">
    <div className={`w-2.5 h-2.5 rounded-full ${completed ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : active ? 'bg-white' : 'bg-zinc-800'}`} />
    <span className={`text-sm ${completed ? 'text-zinc-400 line-through' : active ? 'text-white' : 'text-zinc-600'}`}>{title}</span>
  </div>
);
