import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { deliveryPoints, type DeliveryPoint } from "@/data/catalog";

interface DeliveryState {
  points: DeliveryPoint[];
  selected: DeliveryPoint;
  selectedId: number;
  select: (id: number) => void;
}

const DeliveryContext = createContext<DeliveryState | null>(null);

export function DeliveryProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<number>(deliveryPoints[0].id);

  const value = useMemo<DeliveryState>(() => {
    const selected =
      deliveryPoints.find((p) => p.id === selectedId) ?? deliveryPoints[0];
    return {
      points: deliveryPoints,
      selected,
      selectedId,
      select: setSelectedId,
    };
  }, [selectedId]);

  return <DeliveryContext value={value}>{children}</DeliveryContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDelivery(): DeliveryState {
  const ctx = useContext(DeliveryContext);
  if (!ctx) throw new Error("useDelivery debe usarse dentro de <DeliveryProvider>");
  return ctx;
}
