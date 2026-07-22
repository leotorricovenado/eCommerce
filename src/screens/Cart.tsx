import { useNavigate } from "react-router-dom";
import { Trash2, Info, ShoppingCart } from "lucide-react";
import { StatusBar, TopBar } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { Button, ProductThumb, QuantityStepper } from "@/components/primitives";
import { productById, customer } from "@/data/catalog";
import { bs, computeTotals } from "@/lib/format";
import { useCart } from "@/state/cart";

const DISCOUNT_RATE = 0.1; // Descuento Mayorista A

export function Cart() {
  const nav = useNavigate();
  const { lines, setQty, remove, subtotal, count } = useCart();
  const discount = subtotal * DISCOUNT_RATE;
  const totals = computeTotals(subtotal, discount);

  if (count === 0) {
    return (
      <>
        <StatusBar />
        <TopBar title="Tu Pedido" onBack={() => nav(-1)} showCart={false} />
        <Screen className="grid place-items-center bg-canvas p-8">
          <div className="text-center">
            <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand">
              <ShoppingCart size={28} />
            </div>
            <p className="font-display text-lg font-bold text-ink">
              Tu carrito está vacío
            </p>
            <p className="mt-1 text-sm text-muted">
              Agregá productos del catálogo para empezar tu pedido.
            </p>
            <Button className="mt-5" onClick={() => nav("/catalogo")}>
              Ir al catálogo
            </Button>
          </div>
        </Screen>
      </>
    );
  }

  return (
    <>
      <StatusBar />
      <TopBar title="Tu Pedido" onBack={() => nav(-1)} showCart={false} />
      <Screen className="bg-canvas">
        <div className="p-4">
          <p className="mb-3 text-xs text-muted">
            {count} artículos seleccionados
          </p>
          <div className="space-y-3">
            {lines.map(({ id, qty }) => {
              const p = productById(id);
              if (!p) return null;
              return (
                <div
                  key={id}
                  className="flex gap-3 rounded-2xl border border-hair bg-surface p-3"
                >
                  <ProductThumb product={p} className="h-16 w-16 shrink-0" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-[10px] font-bold uppercase text-muted">
                      {p.brand}
                    </p>
                    <p className="truncate text-sm font-semibold text-ink">
                      {p.name}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper
                        size="sm"
                        value={qty}
                        onChange={(v) => setQty(id, v)}
                      />
                      <span className="font-display text-sm font-bold text-ink">
                        {bs(p.pricePerUnit * qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(id)}
                    className="self-start text-gray hover:text-danger"
                    aria-label="Quitar"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-xl bg-brand-50 p-3 text-[12px] text-brand-dark">
            <Info size={16} className="mt-0.5 shrink-0" />
            Los precios y el stock se confirman al reservar.
          </div>

          {/* Resumen */}
          <div className="mt-4 space-y-2 rounded-2xl border border-hair bg-surface p-4">
            <Row label="Subtotal" value={bs(totals.subtotal)} />
            <Row
              label={`Descuento ${customer.priceList} (10%)`}
              value={`- ${bs(discount)}`}
              accent
            />
            <Row label="IVA 13% (incluido)" value={bs(totals.iva)} muted />
            <div className="my-1 border-t border-hair" />
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-bold text-ink">
                Total
              </span>
              <span className="font-display text-lg font-extrabold text-ink">
                {bs(totals.total)}
              </span>
            </div>
          </div>
        </div>
      </Screen>

      <div className="shrink-0 border-t border-hair bg-surface px-4 py-3">
        <Button size="lg" className="w-full" onClick={() => nav("/reserva")}>
          Reservar y pagar · {bs(totals.total)}
        </Button>
      </div>
    </>
  );
}

function Row({
  label,
  value,
  accent,
  muted,
}: {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted">{label}</span>
      <span
        className={`font-semibold tabular-nums ${
          accent ? "text-success" : muted ? "text-muted" : "text-ink"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
