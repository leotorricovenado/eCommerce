import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, productById } from "@/data/catalog";

interface CartState {
  items: Record<string, number>; // productId -> cantidad
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  lines: { id: string; qty: number }[];
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // Arranca con un par de ítems para que las pantallas de carrito/pedido
  // se vean pobladas en el prototipo.
  const [items, setItems] = useState<Record<string, number>>({
    "ketchup-985": 2,
    "mayonesa-1k": 3,
    "gelatina-frambuesa": 4,
  });

  const value = useMemo<CartState>(() => {
    const setQty = (id: string, qty: number) =>
      setItems((prev) => {
        const next = { ...prev };
        if (qty <= 0) delete next[id];
        else next[id] = qty;
        return next;
      });

    const lines = Object.entries(items).map(([id, qty]) => ({ id, qty }));
    const subtotal = lines.reduce((sum, { id, qty }) => {
      const p = productById(id);
      return sum + (p ? p.pricePerUnit * qty : 0);
    }, 0);
    const count = lines.reduce((n, { qty }) => n + qty, 0);

    return {
      items,
      add: (id, qty = 1) => setQty(id, (items[id] ?? 0) + qty),
      setQty,
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
