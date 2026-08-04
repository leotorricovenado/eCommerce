import type { ReactNode } from "react";
import { StatusBar, TopBar } from "@/components/chrome";
import { DeliveryPointPicker } from "@/components/DeliveryPointPicker";
import { Screen } from "@/components/DeviceFrame";
import { Button, Card, ProductThumb, QuantityStepper } from "@/components/primitives";
import {
  customer,
  hasBoxOption,
  productById,
  unitLabel,
  unitPrice,
} from "@/data/catalog";
import { bs, computeTotals } from "@/lib/format";
import { useCart } from "@/state/cart";
import { Info, ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DISCOUNT_RATE = 0.1; // Descuento Mayorista A

export function Cart() {
  const nav = useNavigate();
  const { lines, setQty, setUnit, remove, subtotal, count } = useCart();
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
            {lines.map(({ id, qty, unit }) => {
              const p = productById(id);
              if (!p) return null;
              const price = unitPrice(p, unit);
              return (
                <Card key={id} padding="p-3" className="flex gap-3">
                  <ProductThumb product={p} className="h-16 w-16 shrink-0" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-[10px] font-bold uppercase text-muted">
                      {p.brand}
                    </p>
                    <p className="truncate text-sm font-semibold text-ink">
                      {p.name}
                    </p>
                    <p className="text-[11px] text-muted">
                      {unitLabel(unit, p)} · {bs(price)} c/{unit === "caja" ? "caja" : "u"}
                    </p>

                    {hasBoxOption(p) && (
                      <div className="mt-1.5 inline-flex w-fit rounded-lg border border-line bg-canvas p-0.5 text-[10px] font-semibold">
                        <UnitPill
                          active={unit === "unidad"}
                          onClick={() => setUnit(id, "unidad")}
                        >
                          Unidad
                        </UnitPill>
                        <UnitPill
                          active={unit === "caja"}
                          onClick={() => setUnit(id, "caja")}
                        >
                          Caja x{p.boxSize}
                        </UnitPill>
                      </div>
                    )}

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper
                        size="sm"
                        value={qty}
                        onChange={(v) => setQty(id, v)}
                      />
                      <span className="font-display text-sm font-bold text-ink">
                        {bs(price * qty)}
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
                </Card>
              );
            })}
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-xl bg-brand-50 p-3 text-[12px] text-brand-dark">
            <Info size={16} className="mt-0.5 shrink-0" />
            Los precios y el stock se confirman al reservar.
          </div>

          {/* Punto de entrega */}
          <div className="mt-4">
            <DeliveryPointPicker />
          </div>

          {/* Resumen */}
          <Card className="mt-4">
            <h3 className="mb-3 font-display text-sm font-bold text-ink">
              Resumen de precios y descuentos
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <TotalBox label="Total Bruto (Bs.)" value={bs(totals.subtotal)} />
              <TotalBox
                label={`Total Desct. (Bs.)`}
                value={`- ${bs(discount)}`}
              />
            </div>
            <div className="mt-2">
              <TotalBox
                label="Total Neto (Bs.)"
                value={bs(totals.total)}
                emphasis
              />
            </div>
            <p className="mt-2 text-[11px] text-muted">
              {customer.priceList} (10% desc.) — IVA 13% incluido en el
              precio.
            </p>
          </Card>
        </div>
      </Screen>

      <div className="shrink-0 border-t border-hair bg-surface px-4 py-3">
        <Button
          size="lg"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
          onClick={() => nav("/reserva")}
        >
          Calcular precios y descuentos
        </Button>
      </div>
    </>
  );
}

function UnitPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-2 py-1 outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 ${
        active ? "bg-brand text-white" : "text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function TotalBox({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-bold text-brand">{label}</p>
      <div
        className={`rounded-lg border border-hair bg-canvas px-3 py-2 text-right tabular-nums ${
          emphasis
            ? "font-display text-lg font-extrabold text-ink"
            : "text-sm font-semibold text-ink"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
