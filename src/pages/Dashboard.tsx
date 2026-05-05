import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { LogOut, BookOpen, Users, Code, LayoutDashboard, Plus, Trash2, Edit3, X, Save, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { courseService, Course } from '../services/courseService';

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', instructor: 'SHF Staff' });
  const [editCourse, setEditCourse] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAll();
      setCourses(data);
    } catch (err: any) {
      console.error(err);
      setError('Erro ao carregar cursos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      const slug = newCourse.title.toLowerCase().replace(/ /g, '-');
      await courseService.create({
        title: newCourse.title,
        description: newCourse.description,
        slug,
        thumbnail_url: null
      });
      setNewCourse({ title: '', description: '', instructor: 'SHF Staff' });
      setIsAdding(false);
      loadCourses();
    } catch (err: any) {
      setError(err.message || 'Erro ao criar curso.');
    }
  };

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      setError('');
      await courseService.update(editingId, {
        title: editCourse.title,
        description: editCourse.description
      });
      setEditingId(null);
      loadCourses();
    } catch (err: any) {
      setError('Erro ao atualizar curso.');
    }
  };

  const startEditing = (course: Course) => {
    setEditingId(course.id!);
    setEditCourse({ title: course.title, description: course.description || '' });
    setIsAdding(false);
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este curso?')) return;
    try {
      await courseService.delete(id);
      loadCourses();
    } catch (err: any) {
      setError('Erro ao excluir curso.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex selection:bg-emerald-500/30">
      {/* Sidebar */}
      {/* Mobile Menu Overlay */}
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

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-zinc-950 border-r border-zinc-900 z-50 p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center p-0.5 overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-sm tracking-tight text-white">SoftwareHouse</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-500">
                <X size={20} />
              </button>
            </div>
            
            <nav className="space-y-1">
              <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
              <NavItem icon={<BookOpen size={18} />} label="Projetos" />
              <NavItem icon={<Users size={18} />} label="Equipe" />
              <NavItem icon={<Code size={18} />} label="API Docs" />
            </nav>

            <div className="mt-auto absolute bottom-6 left-6 right-6 pt-6 border-t border-zinc-900">
               <Button variant="ghost" className="w-full justify-start text-zinc-500" onClick={signOut}>
                <LogOut size={16} className="mr-2" /> Sair
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="w-64 border-r border-zinc-900 flex flex-col p-6 hidden md:flex sticky top-0 h-screen bg-black/40">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center shadow-lg shadow-emerald-900/20 p-0.5 overflow-hidden">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white italic">SoftwareHouse</span>
        </div>

        <nav className="space-y-1 flex-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <NavItem icon={<BookOpen size={18} />} label="Meus Cursos" />
          <NavItem icon={<Code size={18} />} label="Projetos" />
          <NavItem icon={<Users size={18} />} label="Comunidade" />
        </nav>

        <div className="pt-6 border-t border-zinc-900 mt-auto">
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-zinc-900 flex items-center justify-between px-4 md:px-8 bg-black/60 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-zinc-400 hover:text-white md:hidden"
            >
              <LayoutDashboard size={20} />
            </button>
            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Workspace / Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
             <Button 
               onClick={() => setIsAdding(true)}
               size="sm" 
               className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2 border-none shadow-lg shadow-emerald-900/40"
             >
               <Plus size={16} /> Novo Registro
             </Button>
          </div>
        </header>

        <div className="p-8 overflow-y-auto custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex justify-between items-end border-l-2 border-emerald-500 pl-6 py-1"
          >
            <div>
              <h1 className="text-3xl font-bold mb-1 text-white tracking-tight">Academia SoftwareHouse.</h1>
              <p className="text-zinc-500 text-sm">Prontuário de desenvolvimento e monitoramento de projetos técnicos.</p>
            </div>
          </motion.div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <AnimatePresence>
            {isAdding && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-10 overflow-hidden"
              >
                <form onSubmit={handleCreateCourse} className="bg-zinc-900/50 border border-emerald-500/20 rounded-2xl p-6 space-y-4 shadow-2xl shadow-emerald-900/10">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-emerald-400 text-[10px] uppercase tracking-[0.2em]">Inclusão de Registro</h3>
                    <button type="button" onClick={() => setIsAdding(false)} className="text-zinc-600 hover:text-white transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      placeholder="Título do Projeto"
                      value={newCourse.title}
                      onChange={e => setNewCourse({...newCourse, title: e.target.value})}
                      className="bg-black border border-zinc-800 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none transition-all text-white placeholder:text-zinc-700"
                      required
                    />
                    <input 
                      placeholder="Identificador do Instrutor"
                      value={newCourse.instructor}
                      onChange={e => setNewCourse({...newCourse, instructor: e.target.value})}
                      className="bg-black border border-zinc-800 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none transition-all text-white placeholder:text-zinc-700"
                    />
                  </div>
                  <textarea 
                    placeholder="Descrição técnica ou ementa..."
                    value={newCourse.description}
                    onChange={e => setNewCourse({...newCourse, description: e.target.value})}
                    className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none transition-all h-24 text-white placeholder:text-zinc-700"
                  />
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="text-zinc-500">Abortar</Button>
                    <Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-500 border-none px-6">Salvar Dados</Button>
                  </div>
                </form>
              </motion.div>
            )}

            {editingId && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-10 overflow-hidden"
              >
                <form onSubmit={handleUpdateCourse} className="bg-zinc-900/40 border border-emerald-500/20 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-emerald-500 text-sm uppercase tracking-widest">Editar Curso</h3>
                    <button type="button" onClick={() => setEditingId(null)} className="text-zinc-500 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>
                  <input 
                    placeholder="Título do Curso"
                    value={editCourse.title}
                    onChange={e => setEditCourse({...editCourse, title: e.target.value})}
                    className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none transition-colors text-white"
                    required
                  />
                  <textarea 
                    placeholder="Descrição curta"
                    value={editCourse.description}
                    onChange={e => setEditCourse({...editCourse, description: e.target.value})}
                    className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none transition-colors h-24 text-white"
                  />
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
                    <Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-500 border-none">Atualizar Projeto</Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {courses.length === 0 ? (
                <div className="col-span-full py-20 text-center border border-dashed border-zinc-800 rounded-3xl text-zinc-600">
                  Nenhum curso cadastrado ainda.
                </div>
              ) : (
                courses.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-zinc-900/20 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500/40 hover:bg-zinc-900/40 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={(e) => { e.stopPropagation(); startEditing(course); }}
                        className="p-1.5 bg-black/80 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-zinc-800"
                        title="Editar"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id!); }}
                        className="p-1.5 bg-black/80 rounded-lg text-red-500 hover:text-red-400 hover:bg-red-500/10 border border-zinc-800"
                        title="Excluir"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex justify-between items-start mb-4">
                       <div className="p-2 bg-emerald-600/10 rounded-xl text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                         <BookOpen size={20} />
                       </div>
                       <div className="flex flex-col items-end">
                         <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">Verificado</span>
                       </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-zinc-100 line-clamp-1 group-hover:text-emerald-400 transition-colors">{course.title}</h3>
                    <p className="text-zinc-500 text-xs mb-4 line-clamp-2 h-8 leading-relaxed italic">{course.description || 'Nenhum detalhe técnico anexado.'}</p>
                    
                    <div className="pt-4 border-t border-zinc-800/50 flex justify-between items-center group-hover:border-emerald-500/20 transition-colors">
                       <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[10px] text-zinc-500 font-mono">
                           {course.created_at ? new Date(course.created_at).toLocaleDateString() : 'Recent'}
                         </span>
                       </div>
                       <Button variant="ghost" size="sm" className="h-8 text-emerald-500 hover:bg-emerald-500 hover:text-white text-[10px] uppercase font-bold tracking-widest rounded-lg">Acessar</Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                   <LayoutDashboard className="text-zinc-600" />
                </div>
                <h4 className="text-zinc-100 font-medium mb-2">Monitor de Sistema</h4>
                <p className="text-zinc-600 text-sm max-w-xs">Todos os sistemas operacionais e integrações Supabase estão verdes (OK).</p>
             </div>
             <div className="bg-gradient-to-br from-emerald-950/20 to-transparent border border-emerald-500/10 rounded-2xl p-8 min-h-[300px]">
                <h4 className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-6">Pipeline de Migração</h4>
                <div className="space-y-6">
                   <Step completed title="Profiles & Roles" />
                   <Step completed title="Course Schema" />
                   <Step active title="CRUD Dashboard logic" />
                   <Step title="Content Delivery API" />
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${active ? 'bg-emerald-600/10 text-emerald-500' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'}`}>
    {icon}
    {label}
  </div>
);

const Step = ({ title, completed = false, active = false }: { title: string, completed?: boolean, active?: boolean }) => (
  <div className="flex items-center gap-4">
    <div className={`w-2.5 h-2.5 rounded-full ${completed ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : active ? 'bg-white' : 'bg-zinc-800'}`} />
    <span className={`text-sm ${completed ? 'text-zinc-400 line-through' : active ? 'text-white' : 'text-zinc-600'}`}>{title}</span>
  </div>
);

