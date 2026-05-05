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
  async getAllUsers(): Promise<UserProfile[]> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('full_name', { ascending: true });
    
    if (error) throw error;
    return data as UserProfile[];
  },

  async createUser(user: Omit<UserProfile, 'id'>): Promise<UserProfile> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([user])
      .select()
      .single();
    
    if (error) throw error;
    return data as UserProfile;
  },

  async updateUser(id: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updates)
      .match({ id })
      .select()
      .single();
    
    if (error) throw error;
    return data as UserProfile;
  },

  async deleteUser(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .match({ id });
    
    if (error) throw error;
  }
};
