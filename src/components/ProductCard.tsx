import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { Product } from "@/data/catalog";
import { bs } from "@/lib/format";
import { useCart } from "@/state/cart";
import { Card, ProductThumb, StockBadge } from "@/components/primitives";

export function ProductCard({ product }: { product: Product }) {
  const nav = useNavigate();
  const { items, add, setQty, remove } = useCart();
  const line = items[product.id];
  const inCart = (line?.qty ?? 0) > 0;
  const out = product.stock === "out";

  return (
    <Card padding="" className="flex flex-col overflow-hidden">
      <button
        onClick={() => nav(`/producto/${product.id}`)}
        className="relative aspect-square w-full p-3 text-left"
      >
        <ProductThumb product={product} className="h-full w-full" />
        <span className="absolute left-2 top-2">
          <StockBadge level={product.stock} />
        </span>
      </button>

      <div className="flex flex-1 flex-col px-3 pb-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-muted">
          {product.brand}
        </p>
        <button
          onClick={() => nav(`/producto/${product.id}`)}
          className="line-clamp-2 text-left text-[13px] font-semibold leading-snug text-ink"
        >
          {product.name}
        </button>

        <div className="mt-auto pt-2">
          <div className="leading-tight">
            <p className="font-display text-[15px] font-bold text-ink">
              {bs(product.pricePerUnit)}
            </p>
            <p className="text-[10px] text-muted">por unidad</p>
          </div>

          <div className="mt-2">
            {out ? (
              <div className="grid h-9 w-full place-items-center rounded-lg border border-line bg-canvas text-[11px] font-medium text-muted">
                Sin stock
              </div>
            ) : inCart && line ? (
              <div className="flex h-9 items-center justify-between rounded-full border-2 border-brand bg-surface pl-1 pr-1 shadow-xs">
                <button
                  onClick={() =>
                    line.qty > 1
                      ? setQty(product.id, line.qty - 1)
                      : remove(product.id)
                  }
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-brand outline-none transition-colors hover:bg-brand-50 focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  aria-label={line.qty > 1 ? "Quitar uno" : "Quitar del carrito"}
                >
                  {line.qty > 1 ? <Minus size={14} /> : <Trash2 size={14} />}
                </button>
                <span className="min-w-0 flex-1 truncate text-center text-[11px] font-semibold leading-none text-ink">
                  {line.qty}{" "}
                  {line.unit === "caja"
                    ? line.qty > 1
                      ? "cajas"
                      : "caja"
                    : "und."}
                </span>
                <button
                  onClick={() => add(product.id)}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-white outline-none transition-colors hover:bg-brand-dark focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  aria-label="Agregar uno más"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => add(product.id, 1, "unidad")}
                className="grid h-9 w-full place-items-center rounded-lg bg-brand text-white shadow-xs outline-none transition-colors hover:bg-brand-dark focus-visible:ring-[3px] focus-visible:ring-ring/50"
                aria-label="Agregar"
              >
                <Plus size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
