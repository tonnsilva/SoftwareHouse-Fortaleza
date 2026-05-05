import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { LogIn, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao entrar. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Acesso Restrito"
      subtitle="Identifique-se para acessar o prontuário técnico da SoftwareHouse Fortaleza."
    >
      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          label="E-mail Funcional"
          type="email"
          placeholder="colaborador@shf.com.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="space-y-1">
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <Link to="/recover" className="text-xs text-emerald-500 hover:text-emerald-400 font-medium transition-colors">
              Recuperar Password
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
            <span>{error}</span>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-lg shadow-emerald-900/40" 
          isLoading={loading}
        >
          Autenticar no Terminal
          <LogIn className="ml-2 w-4 h-4" />
        </Button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-900"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-zinc-600">
            <span className="bg-black px-4">SoftwareHouse Fortaleza</span>
          </div>
        </div>

        <div className="pt-2 text-center">
          <Link to="/register" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors flex items-center justify-center gap-1 group">
            Não possui registro? <span className="group-hover:underline underline-offset-4">Solicitar acesso</span> <ArrowRight size={12} />
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
