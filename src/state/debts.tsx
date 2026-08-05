import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";

interface DebtsState {
  paidId: string | null;
  markPaid: (id: string) => void;
  isPaid: (id: string) => boolean;
}

const DebtsContext = createContext<DebtsState | null>(null);

export function DebtsProvider({ children }: { children: ReactNode }) {
  const [paidId, setPaidId] = useState<string | null>(null);
  const value = useMemo<DebtsState>(
    () => ({
      paidId,
      markPaid: (id) => setPaidId(id),
      isPaid: (id) => paidId === id,
    }),
    [paidId],
  );
  return <DebtsContext value={value}>{children}</DebtsContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDebts(): DebtsState {
  const ctx = useContext(DebtsContext);
  if (!ctx) throw new Error("useDebts debe usarse dentro de <DebtsProvider>");
  return ctx;
}
