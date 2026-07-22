import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "evenado.session.phone";

function readInitialPhone(): string | null {
  const fromUrl = new URLSearchParams(window.location.hash.split("?")[1] ?? "")
    .get("phone");
  if (fromUrl) {
    localStorage.setItem(STORAGE_KEY, fromUrl);
    return fromUrl;
  }
  return localStorage.getItem(STORAGE_KEY);
}

interface SessionState {
  phone: string | null;
}

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [phone] = useState<string | null>(() => readInitialPhone());
  const value = useMemo<SessionState>(() => ({ phone }), [phone]);
  return <SessionContext value={value}>{children}</SessionContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSession(): SessionState {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession debe usarse dentro de <SessionProvider>");
  return ctx;
}
