import { useNavigate } from "react-router-dom";
import { Check, Clock, AlertTriangle } from "lucide-react";
import { StatusBar } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { Button, ProductThumb } from "@/components/primitives";
import { productById, customer } from "@/data/catalog";
import { bs, computeTotals } from "@/lib/format";
import { useCart } from "@/state/cart";
import { useCountdown } from "@/lib/useCountdown";

const DISCOUNT_RATE = 0.1;

export function Reservation() {
  const nav = useNavigate();
  const { lines, subtotal } = useCart();
  const { label } = useCountdown(600);
  const totals = computeTotals(subtotal, subtotal * DISCOUNT_RATE);

  return (
    <>
      <StatusBar />
      <Screen className="bg-canvas">
        <div className="space-y-4 p-4">
          {/* Éxito */}
          <div className="flex flex-col items-center pt-4 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-success text-white">
              <Check size={32} strokeWidth={3} />
            </div>
            <h2 className="mt-3 font-display text-xl font-bold text-ink">
              Stock reservado
            </h2>
            <p className="mt-1 text-sm text-muted">
              Tu pedido fue separado en el almacén.
            </p>
          </div>

          {/* Contador */}
          <div className="flex flex-col items-center rounded-2xl border border-hair bg-surface py-5">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
              <Clock size={14} /> Tiempo para pagar
            </span>
            <span className="mt-1 font-display text-5xl font-extrabold tabular-nums text-brand">
              {label}
            </span>
          </div>

          {/* Aviso */}
          <div className="flex items-start gap-2 rounded-xl bg-warning-50 p-3 text-[12px] text-[#8a6d00]">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <span>
              Tu reserva expira pronto. Completá el pago antes de que termine
              para garantizar la disponibilidad de los productos.
            </span>
          </div>

          {/* Resumen */}
          <div className="rounded-2xl border border-hair bg-surface p-4">
            <h3 className="mb-3 font-display text-sm font-bold text-ink">
              Resumen del pedido
            </h3>
            <div className="space-y-3">
              {lines.map(({ id, qty }) => {
                const p = productById(id);
                if (!p) return null;
                return (
                  <div key={id} className="flex items-center gap-3">
                    <ProductThumb product={p} className="h-11 w-11 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-ink">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-muted">Cant: {qty}</p>
                    </div>
                    <span className="text-[13px] font-bold text-ink">
                      {bs(p.pricePerUnit * qty)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-hair pt-3">
              <span className="font-display text-sm font-bold text-ink">
                Total a pagar
              </span>
              <span className="font-display text-lg font-extrabold text-brand">
                {bs(totals.total)}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-muted">
              Entrega: {customer.warehouse}
            </p>
          </div>
        </div>
      </Screen>

      <div className="shrink-0 border-t border-hair bg-surface px-4 py-3">
        <Button
          variant="accent"
          size="lg"
          className="w-full"
          onClick={() => nav("/pago")}
        >
          Pagar ahora con QR
        </Button>
        <button
          onClick={() => nav("/carrito")}
          className="mt-2 w-full text-center text-xs font-semibold text-muted"
        >
          Volver al carrito
        </button>
      </div>
    </>
  );
}
