import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Github, ExternalLink, Code2, AlertCircle, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectService, Project } from '../services/projectService';
import { Button } from '../components/ui/Button';

export function Projetos() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout 
      title="Projetos Ativos"
      headerAction={
        <Button size="sm" className="bg-emerald-600 gap-2">
          <Plus size={16} /> Novo Projeto
        </Button>
      }
    >
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-3xl text-zinc-500">
          <Code2 size={48} className="mb-4 opacity-20" />
          <p>Nenhum projeto registrado no pipeline atual.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:bg-zinc-900/60 transition-colors group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <Code2 size={24} />
                </div>
                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded border ${
                  project.status === 'Finalizado' 
                  ? 'border-emerald-500/50 text-emerald-500' 
                  : 'border-amber-500/50 text-amber-500'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags?.map((tag) => (
                  <span key={tag} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                {project.repo_url && (
                  <a 
                    href={project.repo_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Github size={16} />
                    Repositório
                  </a>
                )}
                {project.demo_url && (
                  <a 
                    href={project.demo_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Ver Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Layout>
  );
}
