import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

const isValidUrl = (url: string) => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'ERRO NO SUPABASE: Variáveis de ambiente não encontradas.\n' +
    'VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY são obrigatórias.'
  );
}

// Se a URL for inválida, usamos uma URL de fallback segura para evitar que o createClient dispare uma exceção fatal
const finalUrl = isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder-project.supabase.co';
const finalKey = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(finalUrl, finalKey);
