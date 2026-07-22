import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";

export interface PlacedOrder {
  number: string;
  total: number;
}

interface OrderState {
  placed: PlacedOrder | null;
  place: (order: PlacedOrder) => void;
  reset: () => void;
}

const OrderContext = createContext<OrderState | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const value = useMemo<OrderState>(
    () => ({
      placed,
      place: (order) => setPlaced(order),
      reset: () => setPlaced(null),
    }),
    [placed],
  );
  return <OrderContext value={value}>{children}</OrderContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOrder(): OrderState {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder debe usarse dentro de <OrderProvider>");
  return ctx;
}
