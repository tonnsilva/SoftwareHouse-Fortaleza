import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/**
 * PONTO DE ENTRADA (Main)
 * 
 * FUNÇÃO: Inicia a aplicação React e injeta no HTML.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
