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
  async getAll() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Course[];
  },

  async create(course: Omit<Course, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('courses')
      .insert([course])
      .select()
      .single();
    
    if (error) throw error;
    return data as Course;
  },

  async update(id: string, updates: Partial<Course>) {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .match({ id })
      .select()
      .single();
    
    if (error) throw error;
    return data as Course;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('courses')
      .delete()
      .match({ id });
    
    if (error) throw error;
  }
};
