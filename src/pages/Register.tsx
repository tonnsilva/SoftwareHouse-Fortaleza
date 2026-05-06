import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';

/**
 * PÁGINA DE REGISTRO
 * 
 * FUNÇÃO: Cria um novo usuário no Supabase Auth.
 */
export const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout title="Sucesso!" subtitle="Verifique seu e-mail para confirmar seu registro.">
        <Link to="/login"><Button className="w-full bg-emerald-600">Voltar ao Login</Button></Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Novo Registro" subtitle="Inicie sua jornada técnica na Software House Fortaleza.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Nome Completo" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="E-mail" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha (mín. 6 chars)" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <p className="text-xs text-red-500 bg-red-500/10 p-3 rounded-lg">{error}</p>}
        <Button type="submit" className="w-full bg-emerald-600" isLoading={loading}>Criar Minha Conta <UserPlus className="ml-2" size={16} /></Button>
        <div className="text-center pt-4 border-t border-zinc-900">
          <Link to="/login" className="text-xs text-zinc-500 hover:text-emerald-500 flex items-center justify-center gap-1"><ArrowLeft size={12} /> Já possuo cadastro</Link>
        </div>
      </form>
    </AuthLayout>
  );
};
