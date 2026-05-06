import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { BookOpen, Users, Code, Activity, TrendingUp } from 'lucide-react';

/**
 * PÁGINA DASHBOARD
 * 
 * FUNÇÃO: Visão geral da plataforma e estatísticas rápidas.
 */
export function Dashboard() {
  const stats = [
    { label: 'Cursos Ativos', value: '12', icon: <BookOpen className="text-emerald-500" />, trend: '+2' },
    { label: 'Membros', value: '1,450', icon: <Users className="text-blue-500" />, trend: '+48' },
    { label: 'Projetos', value: '38', icon: <Code className="text-purple-500" />, trend: '+5' },
    { label: 'Uptime', value: '99.9%', icon: <Activity className="text-amber-500" />, trend: 'Stable' },
  ];

  return (
    <Layout title="Controle Operacional">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-3xl">
            <div className="flex justify-between items-center mb-4">
              <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800">{stat.icon}</div>
              <span className="text-[10px] font-mono text-zinc-600 bg-zinc-950 px-2 py-0.5 rounded">{stat.trend}</span>
            </div>
            <div className="text-2xl font-black text-white">{stat.value}</div>
            <div className="text-xs text-zinc-500 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-[3rem] overflow-hidden relative group">
            <div className="relative z-10 max-w-md">
              <h2 className="text-3xl font-black text-white italic mb-4 leading-tight">Bem-vindo à Academia Software House Fortaleza.</h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">Seus sistemas estão integrados e operantes. Explore os módulos de aprendizagem e o laboratório técnico.</p>
              <button className="bg-emerald-600 text-white font-black px-8 py-3 rounded-2xl hover:bg-emerald-500 transition-all text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/20">Iniciar Exploração</button>
            </div>
            <div className="absolute top-[-10%] right-[-10%] opacity-5 group-hover:opacity-10 transition-opacity">
              <TrendingUp size={300} />
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-950/50 border border-zinc-900 rounded-[3rem] p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 text-emerald-500 animate-pulse"><Activity /></div>
          <h3 className="text-white font-bold mb-2">Sistema Operante</h3>
          <p className="text-zinc-600 text-xs leading-relaxed">A comunicação com o Supabase está ativa. Todos os serviços SHF estão respondendo conforme o esperado.</p>
        </div>
      </div>
    </Layout>
  );
}
