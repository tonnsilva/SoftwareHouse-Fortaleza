import { supabase } from '../lib/supabase';

/**
 * SERVIÇO DE USUÁRIOS (User Service)
 * 
 * FUNÇÃO: Gerencia o CRUD (Criação, Leitura, Atualização e Exclusão) de perfis.
 * 
 * RESOLUÇÃO DE PROBLEMAS:
 * - Erro 403: Verifique se a tabela 'profiles' tem RLS (Row Level Security) habilitado no Supabase.
 */
export interface UserProfile {
  id?: string;
  full_name: string;
  email: string;
  role: 'admin' | 'student' | 'instructor';
  avatar_url?: string;
  status: 'active' | 'inactive' | 'pending';
  created_at?: string;
}

export const userService = {
  async getAllUsers() {
    const { data, error } = await supabase.from('profiles').select('*').order('full_name');
    if (error) throw error;
    return data as UserProfile[];
  },

  async createUser(user: Omit<UserProfile, 'id'>) {
    const { data, error } = await supabase.from('profiles').insert([user]).select().single();
    if (error) throw error;
    return data;
  },

  async updateUser(id: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase.from('profiles').update(updates).match({ id }).select().single();
    if (error) throw error;
    return data;
  },

  async deleteUser(id: string) {
    const { error } = await supabase.from('profiles').delete().match({ id });
    if (error) throw error;
  }
};
