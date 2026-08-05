import { useNavigate, useParams } from "react-router-dom";
import { ShieldCheck, Clock } from "lucide-react";
import { StatusBar, TopBar } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { Button, Card } from "@/components/primitives";
import { QRPlaceholder } from "@/components/QRPlaceholder";
import { bs } from "@/lib/format";
import { debtById } from "@/data/debts";
import { useDebts } from "@/state/debts";
import { useSession } from "@/state/session";
import { useCountdown } from "@/lib/useCountdown";
import { notifyDebtPaid } from "@/lib/botApi";

export function DebtPayment() {
  const nav = useNavigate();
  const { id } = useParams();
  const { markPaid } = useDebts();
  const { phone } = useSession();
  const debt = id ? debtById(id) : undefined;
  const { label } = useCountdown(600);

  if (!debt) {
    return (
      <>
        <StatusBar />
        <TopBar title="Pago de Deuda" onBack={() => nav("/deudas")} showCart={false} />
        <Screen className="bg-canvas">
          <div className="p-4 text-sm text-muted">No encontramos esta factura.</div>
        </Screen>
      </>
    );
  }

  const confirmPayment = () => {
    markPaid(debt.id);
    if (phone) {
      void notifyDebtPaid({ phone, debtId: debt.id, total: debt.amount });
    }
    nav(`/deuda/${debt.id}`);
  };

  return (
    <>
      <StatusBar />
      <TopBar title="Pago de Deuda" onBack={() => nav(-1)} showCart={false} />
      <Screen className="bg-canvas">
        <div className="flex flex-col items-center p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Monto a pagar · Factura #{debt.id}
          </p>
          <p className="mt-1 font-display text-4xl font-extrabold text-ink">
            {bs(debt.amount)}
          </p>

          <Card padding="p-5" className="mt-5 rounded-3xl">
            <QRPlaceholder size={196} />
          </Card>

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
          onClick={() => nav(`/deuda/${debt.id}`)}
          className="w-full text-center text-xs font-semibold text-muted"
        >
          Cancelar pago
        </button>
      </div>
    </>
  );
}
