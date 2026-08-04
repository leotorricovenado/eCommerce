import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, ChevronLeft, X, SearchX } from "lucide-react";
import { StatusBar } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { ProductThumb, StockBadge } from "@/components/primitives";
import { products } from "@/data/catalog";
import { bs } from "@/lib/format";

const recent = ["Ketchup", "Mayonesa", "Gelatina", "Frussion"];

export function Search() {
  const nav = useNavigate();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <>
      <StatusBar />
      <header className="flex items-center gap-2 border-b border-hair bg-surface px-3 py-2">
        <button
          onClick={() => nav(-1)}
          className="grid h-9 w-9 place-items-center rounded-full text-ink outline-none transition-colors hover:bg-canvas focus-visible:ring-[3px] focus-visible:ring-ring/50"
          aria-label="Volver"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-line bg-surface px-3 shadow-xs transition-colors focus-within:border-brand focus-within:ring-[3px] focus-within:ring-ring/50">
          <SearchIcon size={17} className="text-muted" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar productos…"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              aria-label="Limpiar"
            >
              <X size={16} className="text-muted" />
            </button>
          )}
        </div>
      </header>

      <Screen className="bg-canvas">
        {!q.trim() ? (
          <div className="p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
              Búsquedas recientes
            </p>
            <div className="flex flex-wrap gap-2">
              {recent.map((r) => (
                <button
                  key={r}
                  onClick={() => setQ(r)}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink shadow-xs outline-none transition-colors hover:bg-canvas focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="grid place-items-center px-8 py-16 text-center">
            <SearchX size={40} className="text-gray" />
            <p className="mt-3 font-semibold text-ink">Sin resultados</p>
            <p className="mt-1 text-sm text-muted">
              No encontramos productos para “{q}”.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-hair">
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => nav(`/producto/${p.id}`)}
                className="flex w-full items-center gap-3 bg-surface px-4 py-3 text-left outline-none transition-colors hover:bg-canvas focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <ProductThumb product={p} className="h-12 w-12 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase text-muted">
                    {p.brand}
                  </p>
                  <p className="truncate text-sm font-semibold text-ink">
                    {p.name}
                  </p>
                  <div className="mt-0.5">
                    <StockBadge level={p.stock} />
                  </div>
                </div>
                <span className="font-display text-sm font-bold text-ink">
                  {bs(p.pricePerUnit)}
                </span>
              </button>
            ))}
          </div>
        )}
      </Screen>
    </>
  );
}
