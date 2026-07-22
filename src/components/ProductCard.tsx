import { useNavigate } from "react-router-dom";
import { Plus, Check } from "lucide-react";
import type { Product } from "@/data/catalog";
import { bs } from "@/lib/format";
import { useCart } from "@/state/cart";
import { ProductThumb, StockBadge } from "@/components/primitives";

export function ProductCard({ product }: { product: Product }) {
  const nav = useNavigate();
  const { items, add } = useCart();
  const inCart = (items[product.id] ?? 0) > 0;
  const out = product.stock === "out";

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-hair bg-surface">
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

        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="leading-tight">
            <p className="font-display text-[15px] font-bold text-ink">
              {bs(product.pricePerUnit)}
            </p>
            <p className="text-[10px] text-muted">por unidad</p>
          </div>
          <button
            onClick={() => !out && add(product.id)}
            disabled={out}
            className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${
              out
                ? "cursor-not-allowed bg-canvas text-gray"
                : inCart
                  ? "bg-success text-white"
                  : "bg-brand text-white hover:bg-brand-dark"
            }`}
            aria-label={inCart ? "En el carrito" : "Agregar"}
          >
            {inCart ? <Check size={18} /> : <Plus size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
