import { useNavigate } from "react-router-dom";
import { ShieldCheck, Clock } from "lucide-react";
import { StatusBar, TopBar } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { Button } from "@/components/primitives";
import { QRPlaceholder } from "@/components/QRPlaceholder";
import { bs, computeTotals } from "@/lib/format";
import { useCart } from "@/state/cart";
import { useOrder } from "@/state/order";
import { useSession } from "@/state/session";
import { useCountdown } from "@/lib/useCountdown";
import { notifyOrderConfirmed } from "@/lib/botApi";
import { sampleOrderNumber } from "@/data/catalog";

const DISCOUNT_RATE = 0.1;

export function PaymentQR() {
  const nav = useNavigate();
  const { subtotal } = useCart();
  const { place } = useOrder();
  const { phone } = useSession();
  const totals = computeTotals(subtotal, subtotal * DISCOUNT_RATE);
  const { label } = useCountdown(600);

  const confirmPayment = () => {
    place({ number: sampleOrderNumber, total: totals.total });
    if (phone) {
      void notifyOrderConfirmed({
        phone,
        orderNumber: sampleOrderNumber,
        total: totals.total,
      });
    }
    nav(`/pedido/${sampleOrderNumber}`);
  };

  return (
    <>
      <StatusBar />
      <TopBar title="Pago de Pedido" onBack={() => nav(-1)} showCart={false} />
      <Screen className="bg-canvas">
        <div className="flex flex-col items-center p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Monto a pagar
          </p>
          <p className="mt-1 font-display text-4xl font-extrabold text-ink">
            {bs(totals.total)}
          </p>

          <div className="mt-5 rounded-3xl border border-hair bg-surface p-5 shadow-sm">
            <QRPlaceholder size={196} />
          </div>

          <p className="mt-4 max-w-[16rem] text-sm text-muted">
            Escaneá este código con la app de tu banco o billetera digital.
          </p>

          <div className="mt-4 flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand">
            <Clock size={16} />
            Esperando pago… <span className="tabular-nums">{label}</span>
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted">
            <ShieldCheck size={13} />
            Transacción 100% segura y cifrada
          </div>
        </div>
      </Screen>

      <div className="shrink-0 space-y-2 border-t border-hair bg-surface px-4 py-3">
        <Button size="lg" className="w-full" onClick={confirmPayment}>
          Ya pagué / Verificar
        </Button>
        <button
          onClick={() => nav("/carrito")}
          className="w-full text-center text-xs font-semibold text-muted"
        >
          Cancelar pago
        </button>
      </div>
    </>
  );
}
