import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper al estilo shadcn/ui: combina clases condicionales y resuelve
// conflictos de Tailwind (la última clase de un mismo grupo gana).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
