import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'ERRO NO SUPABASE: Variáveis de ambiente não encontradas.\n' +
    'Certifique-se de configurar VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no painel da Vercel.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);
