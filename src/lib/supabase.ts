import { createClient } from '@supabase/supabase-js';

/**
 * CONFIGURAÇÃO DO SUPABASE
 * 
 * FUNÇÃO: Estabelece a conexão com o banco de dados e serviço de autenticação.
 * Utilizamos localStorage para permitir que você configure sua própria URL e Chave sem expor no código.
 */
const getKeys = () => {
  const localUrl = localStorage.getItem('SB_URL');
  const localKey = localStorage.getItem('SB_KEY');
  
  return {
    url: localUrl || (import.meta as any).env?.VITE_SUPABASE_URL || '',
    key: localKey || (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || ''
  };
};

const keys = getKeys();

export const supabase = createClient(
  keys.url || 'https://placeholder.supabase.co', 
  keys.key || 'placeholder-key'
);

export const updateSupabaseConfig = (url: string, key: string) => {
  localStorage.setItem('SB_URL', url);
  localStorage.setItem('SB_KEY', key);
  window.location.reload();
};
