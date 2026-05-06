import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { LGPDConsent } from '../components/LGPDConsent';
import { supabase } from '../lib/supabase';
import { UserPlus, ArrowLeft } from 'lucide-react';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAccepted) {
      setError('Você precisa aceitar os termos da LGPD.');
      return;
    }

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
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Registro Enviado"
        subtitle="Verifique seu e-mail para validar suas credenciais de acesso."
      >
        <div className="text-center space-y-6 py-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
              <UserPlus size={32} />
            </div>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Sua solicitação de acesso foi processada. Um link de confirmação foi enviado para <strong>{email}</strong>.
          </p>
          <div className="pt-4">
            <Link to="/login">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-500 border-none">Voltar para o Início</Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Criar nova conta"
      subtitle="Filiado à Software House Fortaleza. Inicie sua jornada técnica profissional."
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
          placeholder="joao@shf.com.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Senha"
          type="password"
          placeholder="Segurança mínima: 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <LGPDConsent 
          accepted={consentAccepted} 
          onAccept={setConsentAccepted}
          required
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-xl animate-in fade-in zoom-in-95 duration-300">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-none" 
          isLoading={loading}
        >
          Cadastrar Profissional
          <UserPlus className="ml-2 w-4 h-4" />
        </Button>

        <div className="pt-4 text-center border-t border-zinc-900 mt-4">
          <Link to="/login" className="text-xs text-zinc-500 hover:text-emerald-400 inline-flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Já possui registro? Voltar ao acesso
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
