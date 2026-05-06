import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

/**
 * HOOK DE AUTENTICAÇÃO (useAuth)
 * 
 * FUNÇÃO: Monitora o estado do usuário logado em tempo real.
 * Se o usuário deslogar ou a sessão expirar, o estado 'user' será atualizado automaticamente.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading, isAuthenticated: !!user, signOut: () => supabase.auth.signOut() };
}
