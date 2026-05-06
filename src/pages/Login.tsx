import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ArrowRight } from 'lucide-react';

/**
 * PÁGINA DE LOGIN
 * 
 * FUNÇÃO: Autentica o usuário via E-mail e Senha no Supabase Auth.
 */
export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Acesso ao Terminal" subtitle="Entre com suas credenciais Software House Fortaleza.">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <input type="email" placeholder="E-mail" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Senha" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-xs text-red-500 bg-red-500/10 p-3 rounded-lg">{error}</p>}
        <Button type="submit" className="w-full bg-emerald-600" isLoading={loading}>Entrar no Sistema <LogIn className="ml-2" size={16} /></Button>
        <div className="text-center pt-4">
          <Link to="/register" className="text-xs text-zinc-500 hover:text-emerald-500 flex items-center justify-center gap-1">Não tem conta? Solicitar registro <ArrowRight size={12} /></Link>
        </div>
      </form>
    </AuthLayout>
  );
};
