/**
 * SERVIÇO DE CURSOS/PROJETOS (Course Service)
 * 
 * FUNÇÃO: Gerencia a persistência de cursos e registros no banco de dados.
 * Suporta operações de Listagem, Criação, Atualização e Exclusão (CRUD).
 */
import { supabase } from '../lib/supabase';

export interface Course {
  id?: string;
  title: string;
  description: string | null;
  slug: string;
  thumbnail_url: string | null;
  created_at?: string;
}

export const courseService = {
  /**
   * FUNÇÃO: getAll
   * Busca todos os cursos registrados na tabela 'courses'.
   * Ordena por data de criação para mostrar os mais novos primeiro.
   */
  async getAll() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Falha ao buscar cursos:", error.message);
      throw error;
    }
    return data as Course[];
  },

  /**
   * FUNÇÃO: create
   * Insere um novo registro de curso/projeto no sistema.
   */
  async create(course: Omit<Course, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('courses')
      .insert([course])
      .select()
      .single();
    
    if (error) {
      console.error("Falha ao criar curso:", error.message);
      throw error;
    }
    return data as Course;
  },

  /**
   * FUNÇÃO: update
   * Modifica informações de um curso existente via ID.
   */
  async update(id: string, updates: Partial<Course>) {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .match({ id })
      .select()
      .single();
    
    if (error) {
      console.error("Falha ao atualizar curso ID " + id + ":", error.message);
      throw error;
    }
    return data as Course;
  },

  /**
   * FUNÇÃO: delete
   * Remove permanentemente o registro do banco de dados.
   */
  async delete(id: string) {
    const { error } = await supabase
      .from('courses')
      .delete()
      .match({ id });
    
    if (error) {
      console.error("Falha ao remover curso:", error.message);
      throw error;
    }
  }
};
