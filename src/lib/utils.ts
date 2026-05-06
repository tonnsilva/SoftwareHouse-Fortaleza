import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * UTILS: cn
 * 
 * FUNÇÃO: Facilita a combinação de classes Tailwind CSS, resolvendo conflitos
 * (ex: se você passar 'p-4' e 'p-2', ele garante que o valor correto prevaleça).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
