import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const RecoverPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar e-mail de recuperação.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthLayout title="E-mail enviado" subtitle="Verifique sua caixa de entrada.">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
              <CheckCircle2 size={32} />
            </div>
          </div>
          <p className="text-zinc-400 text-sm">
            Enviamos um link de recuperação para <strong>{email}</strong>. Siga as instruções no e-mail para redefinir sua senha.
          </p>
          <Link to="/login" className="block w-full">
            <Button variant="outline" className="w-full">Voltar ao login</Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Recuperar senha"
      subtitle="Informe seu e-mail para receber um link de redefinição."
    >
      <form onSubmit={handleRecover} className="space-y-6">
        <Input
          label="Seu e-mail cadastrado"
          type="email"
          placeholder="exemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" isLoading={loading}>
          Enviar link <Mail className="ml-2 w-4 h-4" />
        </Button>

        <div className="text-center">
          <Link to="/login" className="text-xs text-zinc-500 hover:text-white inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Voltar ao login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
