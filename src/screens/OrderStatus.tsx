import { useNavigate, useParams } from "react-router-dom";
import { Check, FileText, RotateCcw, Info, MessageCircle } from "lucide-react";
import { StatusBar, TopBar, BottomNav } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { Button, ProductThumb } from "@/components/primitives";
import { productById, customer } from "@/data/catalog";
import { bs, computeTotals } from "@/lib/format";
import { useCart } from "@/state/cart";
import { useSession } from "@/state/session";

const DISCOUNT_RATE = 0.1;

const steps = [
  { label: "Reservado", at: "24 Oct, 14:22", done: true },
  { label: "Pago recibido", at: "24 Oct, 14:25", done: true },
  { label: "Pedido confirmado", at: "24 Oct, 14:26", done: true, current: true },
  { label: "En preparación", at: "Pendiente", done: false },
];

export function OrderStatus() {
  const nav = useNavigate();
  const { num } = useParams();
  const { lines, subtotal } = useCart();
  const { phone } = useSession();
  const whatsappHref = phone ? `https://wa.me/${phone}` : "/";
  const discount = subtotal * DISCOUNT_RATE;
  const totals = computeTotals(subtotal, discount);

  return (
    <>
      <StatusBar />
      <TopBar title="Estado del Pedido" onBack={() => nav("/inicio")} showCart={false} />
      <Screen className="bg-canvas">
        <div className="space-y-4 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Número de pedido
            </p>
            <p className="font-display text-2xl font-extrabold text-ink">
              #{num}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              Realizado el 24 de octubre, 14:22
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline">
              <FileText size={16} /> Comprobante
            </Button>
            <Button variant="outline">
              <RotateCcw size={16} /> Repetir pedido
            </Button>
          </div>

          {/* Seguimiento */}
          <div className="rounded-2xl border border-hair bg-surface p-4">
            <h3 className="mb-3 font-display text-sm font-bold text-ink">
              Seguimiento
            </h3>
            <ol className="relative">
              {steps.map((s, i) => (
                <li key={s.label} className="flex gap-3 pb-5 last:pb-0">
                  <div className="relative flex flex-col items-center">
                    <span
                      className={`z-10 grid h-6 w-6 place-items-center rounded-full ${
                        s.done
                          ? "bg-success text-white"
                          : "border-2 border-line bg-surface text-transparent"
                      }`}
                    >
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {i < steps.length - 1 && (
                      <span
                        className={`absolute top-6 h-full w-0.5 ${
                          s.done ? "bg-success" : "bg-line"
                        }`}
                      />
                    )}
                  </div>
                  <div className="-mt-0.5">
                    <p
                      className={`text-sm font-semibold ${
                        s.current
                          ? "text-brand"
                          : s.done
                            ? "text-ink"
                            : "text-muted"
                      }`}
                    >
                      {s.label}
                    </p>
                    <p className="text-[11px] text-muted">{s.at}</p>
                    {s.current && (
                      <p className="mt-1 text-[11px] text-muted">
                        Tu pedido fue validado y está en cola de preparación.
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Detalle de ítems */}
          <div className="rounded-2xl border border-hair bg-surface p-4">
            <h3 className="mb-3 font-display text-sm font-bold text-ink">
              Detalle de ítems
            </h3>
            <div className="space-y-3">
              {lines.map(({ id, qty }) => {
                const p = productById(id);
                if (!p) return null;
                return (
                  <div key={id} className="flex items-center gap-3">
                    <ProductThumb product={p} className="h-10 w-10 shrink-0" />
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
          </div>

          {/* Facturación */}
          <div className="rounded-2xl border border-hair bg-surface p-4 text-sm">
            <h3 className="mb-2 font-display text-sm font-bold text-ink">
              Datos de facturación
            </h3>
            <dl className="space-y-1 text-muted">
              <Line k="Razón social" v={customer.businessName} />
              <Line k="NIT" v={customer.nit} />
              <Line k="Entrega" v={customer.deliveryAddress} />
            </dl>
          </div>

          {/* Resumen */}
          <div className="rounded-2xl border border-hair bg-surface p-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="tabular-nums">{bs(subtotal)}</span>
              </div>
              <div className="flex justify-between text-success">
                <span>Descuento {customer.priceList} (10%)</span>
                <span className="tabular-nums">- {bs(discount)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <div className="mt-1 flex justify-between border-t border-hair pt-2">
                <span className="font-display font-bold text-ink">
                  Total pagado
                </span>
                <span className="font-display text-lg font-extrabold text-success">
                  {bs(totals.total)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-brand-50 p-3 text-[12px] text-brand-dark">
            <Info size={16} className="mt-0.5 shrink-0" />
            ¿Dudas con tu pedido? Escribinos por WhatsApp y un asesor te ayuda.
          </div>

          {phone ? (
            <a
              href={whatsappHref}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white"
              style={{ background: "#25D366" }}
            >
              <MessageCircle size={17} /> Volver al chat de WhatsApp
            </a>
          ) : (
            <button
              onClick={() => nav("/")}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white"
              style={{ background: "#25D366" }}
            >
              <MessageCircle size={17} /> Volver al chat de WhatsApp
            </button>
          )}
        </div>
      </Screen>
      <BottomNav />
    </>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="shrink-0">{k}</dt>
      <dd className="text-right font-medium text-ink">{v}</dd>
    </div>
  );
}
