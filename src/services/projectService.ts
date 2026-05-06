/**
 * SERVIÇO DE PROJETOS (Project Service)
 * 
 * FUNÇÃO: Gerencia os projetos da Software House.
 */
import { supabase } from '../lib/supabase';

export interface Project {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  status: 'Em andamento' | 'Finalizado' | 'Pausado';
  repo_url?: string;
  demo_url?: string;
  created_at?: string;
}

export const projectService = {
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Erro ao buscar projetos:", error.message);
      return []; // Retorna lista vazia para não quebrar o app
    }
    return data as Project[];
  },

  async create(project: Omit<Project, 'id'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    if (error) throw error;
    return data as Project;
  }
};
