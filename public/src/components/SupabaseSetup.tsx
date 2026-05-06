import React, { useState } from 'react';
import { updateSupabaseConfig } from '../lib/supabase';
import { Shield, Key, Link as LinkIcon, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function SupabaseSetup() {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.startsWith('http')) {
      setError('A URL deve começar com http:// ou https://');
      return;
    }
    if (key.length < 20) {
      setError('A chave Anon parece ser curta demais.');
      return;
    }
    updateSupabaseConfig(url, key);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 bg-[grid-white]/[0.02]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-950 border border-emerald-500/20 mb-4 shadow-xl shadow-emerald-950/20">
            <Shield className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Configuração Crítica</h1>
          <p className="text-zinc-500 text-sm">Integração obrigatória com a infraestrutura Supabase da Fortaleza.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">SHF_PROJECT_URL</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/60" />
                <input
                  type="text"
                  placeholder="https://xyz.supabase.co"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono text-xs"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">SHF_ANON_KEY</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/60" />
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono text-xs"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 border-none"
          >
            Sincronizar Ambiente
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </form>

        <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
          <p className="text-xs text-zinc-500 leading-relaxed">
            <span className="text-zinc-300 font-semibold uppercase block mb-1">Onde encontrar?</span>
            Vá no seu <span className="text-emerald-400">Dashboard do Supabase</span> → <span className="text-emerald-400">Project Settings</span> → <span className="text-emerald-400">API</span>. 
            As chaves ficam salvas apenas no seu navegador.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
