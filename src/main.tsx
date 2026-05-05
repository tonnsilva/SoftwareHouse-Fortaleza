import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error handling for debugging blank screens
window.onerror = (message, source, lineno, colno, error) => {
  console.error("Global Error Caught:", { message, source, lineno, colno, error });
};

window.onunhandledrejection = (event) => {
  console.error("Unhandled Promise Rejection:", event.reason);
};

try {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (error) {
  console.error("Fatal Render Error:", error);
  document.body.innerHTML = `
    <div style="background: black; color: white; padding: 20px; font-family: sans-serif;">
      <h1>Erro ao inicializar aplicativo</h1>
      <p>Verifique o console do navegador para mais detalhes.</p>
    </div>
  `;
}
