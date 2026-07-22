import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StatusBar, TopBar } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { Button, ProductThumb, StockBadge, QuantityStepper } from "@/components/primitives";
import { ProductCard } from "@/components/ProductCard";
import { productById, products } from "@/data/catalog";
import { bs } from "@/lib/format";
import { useCart } from "@/state/cart";

export function ProductDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const product = id ? productById(id) : undefined;
  const { add } = useCart();
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
                {bs(product.pricePerUnit)}
              </p>
              <p className="text-xs text-muted">
                por unidad
                {product.pricePerBox &&
                  ` · ${bs(product.pricePerBox)} el bulto de ${product.boxSize}`}
              </p>
            </div>
            <StockBadge level={product.stock} />
          </div>

          <div className="rounded-2xl border border-hair bg-surface p-4">
            <h3 className="mb-1 font-display text-sm font-bold text-ink">
              Detalles de producto
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {product.description}
            </p>
          </div>

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
            add(product.id, qty);
            nav("/carrito");
          }}
        >
          {out ? "Sin stock" : "Agregar al carrito"}
        </Button>
      </div>
    </>
  );
}
