import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

const isValidUrl = (url: string) => {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && url.includes('.');
  } catch {
    return false;
  }
};

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'AVISO: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não configuradas.\n' +
    'O app pode não funcionar corretamente até que você adicione as chaves no painel de Segredos ou Vercel.'
  );
}

// Fallback preventivo para evitar crash no createClient
const finalUrl = isValidUrl(supabaseUrl) ? supabaseUrl : 'https://your-project-id.supabase.co';
const finalKey = supabaseAnonKey || 'your-anon-key';

export const supabase = createClient(finalUrl, finalKey);
