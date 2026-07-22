import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, ShoppingCart } from "lucide-react";
import { StatusBar, TopBar, BottomNav } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type CategoryKey } from "@/data/catalog";
import { useCart } from "@/state/cart";
import { bs } from "@/lib/format";

export function Catalog() {
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();
  const active = params.get("cat") as CategoryKey | null;
  const { count, subtotal } = useCart();

  const list = useMemo(
    () => (active ? products.filter((p) => p.category === active) : products),
    [active],
  );

  const setCat = (key: CategoryKey | null) => {
    if (key) setParams({ cat: key });
    else setParams({});
  };

  return (
    <>
      <StatusBar />
      <TopBar />
      <Screen className="bg-canvas">
        {/* Barra de búsqueda + filtros (sticky) */}
        <div className="sticky top-0 z-10 space-y-3 border-b border-hair bg-surface px-4 pb-3 pt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => nav("/buscar")}
              className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2.5 text-left text-sm text-muted"
            >
              <Search size={17} />
              Buscar productos…
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-ink">
              <SlidersHorizontal size={18} />
            </button>
          </div>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
            <Chip active={!active} onClick={() => setCat(null)}>
              Todos
            </Chip>
            {categories.map((c) => (
              <Chip
                key={c.key}
                active={active === c.key}
                onClick={() => setCat(c.key)}
              >
                {c.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 pb-24">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Screen>

      {/* Resumen de carrito flotante */}
      {count > 0 && (
        <button
          onClick={() => nav("/carrito")}
          className="absolute inset-x-4 bottom-[68px] z-20 flex items-center justify-between rounded-2xl bg-brand px-4 py-3 text-white shadow-lg"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <ShoppingCart size={18} />
            {count} {count === 1 ? "producto" : "productos"}
          </span>
          <span className="flex items-center gap-2 text-sm font-bold">
            {bs(subtotal)}
            <span className="rounded-lg bg-white/20 px-2 py-1 text-xs">
              Ver carrito
            </span>
          </span>
        </button>
      )}
      <BottomNav />
    </>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
        active
          ? "border-brand bg-brand text-white"
          : "border-line bg-surface text-muted"
      }`}
    >
      {children}
    </button>
  );
}
