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
      title="Bem-vindo de volta"
      subtitle="Entre com suas credenciais para acessar sua área de estudos."
    >
      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@nome.com"
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
            <Link to="/recover" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
              Esqueceu sua senha?
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg flex items-center gap-2">
            <span>{error}</span>
          </div>
        )}

        <Button type="submit" className="w-full" isLoading={loading}>
          Entrar no sistema
          <LogIn className="ml-2 w-4 h-4" />
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-zinc-500">Ou continue com</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" type="button">
          Não tem uma conta?
          <Link to="/register" className="ml-2 flex items-center text-white hover:text-indigo-400 transition-colors">
            Cadastre-se <ArrowRight className="ml-1 w-3 h-3" />
          </Link>
        </Button>
      </form>
    </AuthLayout>
  );
};
