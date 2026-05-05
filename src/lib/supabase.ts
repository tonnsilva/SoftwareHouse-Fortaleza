import { createClient } from '@supabase/supabase-js';

// Função para buscar chaves, priorizando localStorage (runtime setup) e depois env vars
const getKeys = () => {
  const localUrl = localStorage.getItem('SB_URL');
  const localKey = localStorage.getItem('SB_KEY');
  
  return {
    url: localUrl || (import.meta as any).env?.VITE_SUPABASE_URL || '',
    key: localKey || (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || ''
  };
};

const keys = getKeys();

const isValidUrl = (url: string) => {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && url.includes('.');
  } catch {
    return false;
  }
};

// Fallback preventivo
const finalUrl = isValidUrl(keys.url) ? keys.url : 'https://your-project-id.supabase.co';
const finalKey = keys.key || 'your-anon-key';

export const supabase = createClient(finalUrl, finalKey);

// Função para atualizar as chaves e recarregar
export const updateSupabaseConfig = (url: string, key: string) => {
  localStorage.setItem('SB_URL', url);
  localStorage.setItem('SB_KEY', key);
  window.location.reload();
};
