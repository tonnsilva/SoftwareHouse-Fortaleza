import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { UserPlus, ArrowLeft } from 'lucide-react';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            consent_accepted: true,
          },
        },
      });

      if (error) throw error;
      alert('Cadastro realizado! Verifique seu e-mail para confirmar a conta.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Criar nova conta"
      subtitle="Junte-se à SoftwareHouse Fortaleza e comece sua jornada técnica hoje."
    >
      <form onSubmit={handleRegister} className="space-y-4">
        <Input
          label="Nome completo"
          type="text"
          placeholder="Ex: João Silva"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="E-mail"
          type="email"
          placeholder="joao@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Senha"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-start gap-2 py-2">
          <input
            type="checkbox"
            id="consent"
            required
            className="mt-1 h-4 w-4 rounded border-zinc-800 bg-zinc-900 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="consent" className="text-xs text-zinc-500 leading-relaxed">
            Eu aceito os <span className="text-indigo-400 cursor-pointer">Termos de Uso</span> e a <span className="text-indigo-400 cursor-pointer">Política de Privacidade</span> (LGPD).
          </label>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" isLoading={loading}>
          Criar minha conta
          <UserPlus className="ml-2 w-4 h-4" />
        </Button>

        <div className="pt-4 text-center">
          <Link to="/login" className="text-xs text-zinc-500 hover:text-white inline-flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Já possui conta? Voltar ao login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
