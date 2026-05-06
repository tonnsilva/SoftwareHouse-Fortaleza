/**
 * SERVIÇO DE USUÁRIOS (User Service)
 * 
 * FUNÇÃO: Este arquivo gerencia todas as operações de banco de dados (CRUD) relacionadas aos perfis de usuários.
 * Ele utiliza o cliente do Supabase para persistir informações como nome, email, cargo (role) e status.
 * 
 * COMO RESOLVER PROBLEMAS:
 * 1. "Erro de Permissão (403/401)": Verifique as Políticas de Segurança (RLS) no console do Supabase para a tabela 'profiles'.
 * 2. "Usuário não aparece": Certifique-se de que o email utilizado no cadastro é o mesmo da autenticação.
 */
import { supabase } from '../lib/supabase';

export interface UserProfile {
  id?: string;
  full_name: string;
  email: string;
  role: 'admin' | 'student' | 'instructor';
  avatar_url: string;
  status: 'active' | 'inactive' | 'pending';
  last_access?: string;
  created_at?: string;
}

const TABLE_NAME = 'profiles';

export const userService = {
  /**
   * Busca todos os usuários cadastrados na tabela 'profiles'.
   * Ordena por nome completo para facilitar a visualização na tabela.
   */
  async getAllUsers(): Promise<UserProfile[]> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('full_name', { ascending: true });
    
    if (error) {
      console.error("Erro ao carregar usuários do Supabase:", error.message);
      throw error;
    }
    return data as UserProfile[];
  },

  /**
   * Insere um novo usuário.
   * Se falhar, verifique se campos obrigatórios (required) estão sendo enviados.
   */
  async createUser(user: Omit<UserProfile, 'id'>): Promise<UserProfile> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([user])
      .select()
      .single();
    
    if (error) {
      console.error("Erro ao criar usuário:", error.message);
      throw error;
    }
    return data as UserProfile;
  },

  /**
   * Atualiza dados de um usuário específico via ID.
   * Útil para mudar o 'status' para ativo/inativo ou alterar cargo (role).
   */
  async updateUser(id: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updates)
      .match({ id })
      .select()
      .single();
    
    if (error) {
      console.error("Erro ao atualizar usuário ID " + id + ":", error.message);
      throw error;
    }
    return data as UserProfile;
  },

  /**
   * Remove o registro do banco de dados definitivamente.
   * CUIDADO: Operação irreversível.
   */
  async deleteUser(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .match({ id });
    
    if (error) {
      console.error("Erro ao deletar usuário:", error.message);
      throw error;
    }
  }
};
