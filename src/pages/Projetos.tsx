import React from 'react';
import { Layout } from '../components/Layout';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { motion } from 'motion/react';

const projects = [
  {
    id: 1,
    title: 'E-commerce Management System',
    description: 'Plataforma completa de gestão para e-commerce com dashboard em tempo real.',
    tags: ['React', 'TypeScript', 'Supabase'],
    status: 'Em andamento',
  },
  {
    id: 2,
    title: 'API Gateway Microservices',
    description: 'Infraestrutura de gateway escalável desenvolvida para alta concorrência.',
    tags: ['Node.js', 'Redis', 'Docker'],
    status: 'Finalizado',
  },
];

export function Projetos() {
  return (
    <Layout title="Projetos Ativos">
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
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors">
                <Github size={16} />
                Repositório
              </button>
              <button className="flex items-center gap-2 text-sm text-emerald-500 hover:text-emerald-400 transition-colors">
                <ExternalLink size={16} />
                Ver Demo
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
}
