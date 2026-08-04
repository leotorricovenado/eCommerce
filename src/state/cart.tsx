import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, productById, unitPrice, type CartUnit } from "@/data/catalog";

export interface CartLine {
  id: string;
  qty: number;
  unit: CartUnit;
}

interface CartState {
  items: Record<string, { qty: number; unit: CartUnit }>; // productId -> línea
  add: (id: string, qty?: number, unit?: CartUnit) => void;
  setQty: (id: string, qty: number) => void;
  setUnit: (id: string, unit: CartUnit) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  lines: CartLine[];
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // Arranca con un par de ítems para que las pantallas de carrito/pedido
  // se vean pobladas en el prototipo.
  const [items, setItems] = useState<
    Record<string, { qty: number; unit: CartUnit }>
  >({
    "ketchup-985": { qty: 2, unit: "unidad" },
    "mayonesa-1k": { qty: 1, unit: "caja" },
    "gelatina-frambuesa": { qty: 4, unit: "unidad" },
  });

  const value = useMemo<CartState>(() => {
    const setQty = (id: string, qty: number) =>
      setItems((prev) => {
        const next = { ...prev };
        if (qty <= 0) delete next[id];
        else next[id] = { unit: prev[id]?.unit ?? "unidad", qty };
        return next;
      });

    const setUnit = (id: string, unit: CartUnit) =>
      setItems((prev) => {
        const line = prev[id];
        if (!line) return prev;
        return { ...prev, [id]: { ...line, unit } };
      });

    // Si se pide una unidad distinta a la ya guardada, la cantidad previa
    // (en la otra unidad) no es compatible y se reemplaza por la nueva.
    const add = (id: string, qty = 1, unit?: CartUnit) =>
      setItems((prev) => {
        const existing = prev[id];
        const nextUnit = unit ?? existing?.unit ?? "unidad";
        const nextQty =
          (existing && existing.unit === nextUnit ? existing.qty : 0) + qty;
        return { ...prev, [id]: { qty: nextQty, unit: nextUnit } };
      });

    const lines: CartLine[] = Object.entries(items).map(([id, l]) => ({
      id,
      qty: l.qty,
      unit: l.unit,
    }));

    const subtotal = lines.reduce((sum, { id, qty, unit }) => {
      const p = productById(id);
      return sum + (p ? unitPrice(p, unit) * qty : 0);
    }, 0);

    const count = lines.reduce((n, { id, qty, unit }) => {
      const p = productById(id);
      const boxSize = unit === "caja" ? (p?.boxSize ?? 1) : 1;
      return n + qty * boxSize;
    }, 0);

    return {
      items,
      add,
      setQty,
      setUnit,
      remove: (id) => setQty(id, 0),
      clear: () => setItems({}),
      count,
      subtotal,
      lines,
    };
  }, [items]);

  return <CartContext value={value}>{children}</CartContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}

// Utilidad para saber cuántos productos totales existen (para conteos).
export const totalCatalogProducts = products.length;
