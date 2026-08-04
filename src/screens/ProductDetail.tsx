import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StatusBar, TopBar } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { Button, Card, ProductThumb, StockBadge, QuantityStepper } from "@/components/primitives";
import { ProductCard } from "@/components/ProductCard";
import {
  hasBoxOption,
  productById,
  products,
  unitLabel,
  unitPrice,
  type CartUnit,
} from "@/data/catalog";
import { bs } from "@/lib/format";
import { useCart } from "@/state/cart";

export function ProductDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const product = id ? productById(id) : undefined;
  const { add } = useCart();
  const [unit, setUnit] = useState<CartUnit>("unidad");
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <>
        <StatusBar />
        <TopBar title="Producto" onBack={() => nav(-1)} />
        <Screen className="grid place-items-center p-8 text-center text-muted">
          Producto no encontrado.
        </Screen>
      </>
    );
  }

  const out = product.stock === "out";
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <StatusBar />
      <TopBar title="Detalle" onBack={() => nav(-1)} />
      <Screen className="bg-canvas">
        {/* Galería */}
        <div className="bg-surface px-4 pb-4 pt-2">
          <ProductThumb product={product} className="aspect-square w-full" />
          <div className="mt-3 flex gap-2">
            {[0, 1, 2].map((i) => (
              <ProductThumb
                key={i}
                product={product}
                className="h-14 w-14 border border-hair"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 p-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
              {product.brand} · {product.unit}
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-ink">
              {product.name}
            </h2>
            <p className="mt-1 text-xs text-muted">SKU: {product.sku}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-2xl font-extrabold text-ink">
                {bs(unitPrice(product, unit))}
              </p>
              <p className="text-xs text-muted">
                {unitLabel(unit, product)}
                {unit === "unidad" &&
                  product.pricePerBox &&
                  ` · ${bs(product.pricePerBox)} el bulto de ${product.boxSize}`}
              </p>
            </div>
            <StockBadge level={product.stock} />
          </div>

          {hasBoxOption(product) && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setUnit("unidad");
                  setQty(1);
                }}
                className={`flex-1 rounded-lg border px-3 py-2 text-center shadow-xs outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 ${
                  unit === "unidad"
                    ? "border-brand bg-brand-50 text-brand"
                    : "border-line bg-surface text-muted"
                }`}
              >
                <span className="block text-sm font-semibold">
                  Por unidad
                </span>
                <span className="block text-xs">
                  {bs(product.pricePerUnit)} c/u
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setUnit("caja");
                  setQty(1);
                }}
                className={`flex-1 rounded-lg border px-3 py-2 text-center shadow-xs outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 ${
                  unit === "caja"
                    ? "border-brand bg-brand-50 text-brand"
                    : "border-line bg-surface text-muted"
                }`}
              >
                <span className="block text-sm font-semibold">
                  Por caja (x{product.boxSize})
                </span>
                <span className="block text-xs">
                  {bs(product.pricePerBox!)} c/caja
                </span>
              </button>
            </div>
          )}

          <Card>
            <h3 className="mb-1 font-display text-sm font-bold text-ink">
              Detalles de producto
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {product.description}
            </p>
          </Card>

          {related.length > 0 && (
            <section>
              <h3 className="mb-2 font-display text-sm font-bold text-ink">
                Productos relacionados
              </h3>
              <div className="grid grid-cols-2 gap-3 pb-2">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </Screen>

      {/* CTA sticky */}
      <div className="flex shrink-0 items-center gap-3 border-t border-hair bg-surface px-4 py-3">
        <QuantityStepper value={qty} onChange={setQty} disabled={out} />
        <Button
          size="lg"
          className="flex-1"
          disabled={out}
          onClick={() => {
            add(product.id, qty, unit);
            nav("/carrito");
          }}
        >
          {out
            ? "Sin stock"
            : `Agregar · ${bs(unitPrice(product, unit) * qty)}`}
        </Button>
      </div>
    </>
  );
}
