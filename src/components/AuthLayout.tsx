import React from 'react';
import { motion } from 'motion/react';

/**
 * AUTH LAYOUT
 * 
 * FUNÇÃO: Componente visual que envolve as telas de Login e Registro.
 * Fornece o fundo escuro, logo e animações de transição.
 */
export const AuthLayout: React.FC<{ children: React.ReactNode; title: string; subtitle: string }> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 bg-[grid-white]/[0.02]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center p-2 shadow-2xl shadow-emerald-500/20">
            <img src="/logo.png" alt="SHF" className="object-contain" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white">{title}</h1>
          <p className="text-zinc-500 text-sm mt-2">{subtitle}</p>
        </div>
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
