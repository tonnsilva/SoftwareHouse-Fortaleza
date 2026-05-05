import React from 'react';

interface LGPDConsentProps {
  accepted: boolean;
  onAccept: (value: boolean) => void;
  required?: boolean;
}

export const LGPDConsent: React.FC<LGPDConsentProps> = ({ accepted, onAccept, required = false }) => {
  return (
    <div className="flex items-start gap-3 py-4 group animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="relative flex items-center h-5">
        <input
          type="checkbox"
          id="lgpd-consent"
          checked={accepted}
          onChange={(e) => onAccept(e.target.checked)}
          required={required}
          className="h-4 w-4 rounded border-zinc-800 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 transition-all cursor-pointer"
        />
      </div>
      <div className="text-xs leading-relaxed text-zinc-500">
        <label htmlFor="lgpd-consent" className="cursor-pointer select-none">
          Ao prosseguir, declaro estar ciente de que meus dados serão processados conforme a{' '}
          <span className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors">
            Política de Privacidade (LGPD)
          </span>{' '}
          da SoftwareHouse Fortaleza.
        </label>
        {required && (
          <span className="block mt-1 text-[10px] text-zinc-600 italic">
            * O aceite é obrigatório para criação da conta.
          </span>
        )}
      </div>
    </div>
  );
};
