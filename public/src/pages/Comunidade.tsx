import React from 'react';
import { Layout } from '../components/Layout';
import { MessageSquare, Users, Award, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { icon: Users, label: 'Membros Ativos', value: '1.240' },
  { icon: MessageSquare, label: 'Mensagens/Dia', value: '4.5k' },
  { icon: Award, label: 'Projetos Entregues', value: '312' },
];

export function Comunidade() {
  return (
    <Layout title="Comunidade">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="text-emerald-500" size={20} />
                <span className="text-zinc-500 text-sm">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-emerald-600 rounded-3xl p-8 relative overflow-hidden">
          <div className="relative z-10 w-full max-w-lg">
            <h2 className="text-3xl font-bold text-white mb-4 italic">Conecte-se com outros desenvolvedores da Software House.</h2>
            <p className="text-emerald-100 mb-8 leading-relaxed">
              Participe de discussões técnicas, compartilhe seus projetos e encontre parceiros para colaborar em novas ideias.
            </p>
            <button className="bg-white text-emerald-600 font-bold px-8 py-3 rounded-xl hover:bg-emerald-50 transition-colors">
              Entrar no Discord
            </button>
          </div>
          <motion.div 
            animate={{ 
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -right-20 -top-20 text-white/10"
          >
            <TrendingUp size={400} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white px-2">Principais Discussões</h3>
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors cursor-pointer">
                <h4 className="text-white font-medium mb-2">Como otimizar queries complexas no Supabase?</h4>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Users size={12} /> 24 respostas</span>
                  <span>há 2 horas</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Membros Destaque</h3>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700" />
                    <div>
                      <div className="text-sm font-bold text-white">Dev Exemplo {i}</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-tighter">Fullstack Developer</div>
                    </div>
                  </div>
                  <div className="text-emerald-500 font-mono text-xs">+1.2k XP</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
