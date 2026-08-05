import { useNavigate, useParams } from "react-router-dom";
import { AlertTriangle, CircleCheckBig, Info, MessageCircle } from "lucide-react";
import { StatusBar, TopBar } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { Button, Card } from "@/components/primitives";
import { debtById, debtStatusLabel } from "@/data/debts";
import { customer } from "@/data/catalog";
import { bs } from "@/lib/format";
import { useDebts } from "@/state/debts";

export function DebtDetail() {
  const nav = useNavigate();
  const { id } = useParams();
  const { isPaid } = useDebts();
  const debt = id ? debtById(id) : undefined;
  const botPhone = import.meta.env.VITE_BOT_WHATSAPP_NUMBER as string | undefined;
  const whatsappHref = botPhone ? `https://wa.me/${botPhone}` : "/";
  const paid = debt ? isPaid(debt.id) : false;

  if (!debt) {
    return (
      <>
        <StatusBar />
        <TopBar title="Deuda" onBack={() => nav("/deudas")} showCart={false} />
        <Screen className="bg-canvas">
          <div className="p-4 text-sm text-muted">No encontramos esta factura.</div>
        </Screen>
      </>
    );
  }

  return (
    <>
      <StatusBar />
      <TopBar
        title="Detalle de Deuda"
        onBack={() => nav("/deudas")}
        showCart={false}
      />
      <Screen className="bg-canvas">
        <div className="space-y-4 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Factura
            </p>
            <p className="font-display text-2xl font-extrabold text-ink">
              #{debt.id}
            </p>
            <p className="mt-0.5 text-xs text-muted">{debt.concept}</p>
          </div>

          {paid ? (
            <Card className="items-center py-6 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success-50 text-success">
                <CircleCheckBig size={28} />
              </span>
              <p className="mt-3 font-display text-base font-bold text-ink">
                Factura pagada
              </p>
              <p className="mt-1 text-sm text-muted">
                Gracias, tu pago de {bs(debt.amount)} fue registrado.
              </p>
            </Card>
          ) : (
            debt.status === "vencida" && (
              <div className="flex items-start gap-2 rounded-xl bg-danger-50 p-3 text-[12px] text-danger">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                Esta factura está vencida hace {debt.daysOverdue} días. Pagala
                para evitar recargos adicionales.
              </div>
            )
          )}

          <Card>
            <h3 className="mb-2 font-display text-sm font-bold text-ink">
              Datos de la factura
            </h3>
            <dl className="space-y-1 text-sm text-muted">
              <Line k="Estado" v={debtStatusLabel[debt.status]} />
              <Line k="Pedido asociado" v={debt.orderRef} />
              <Line k="Fecha de emisión" v={debt.issueDate} />
              <Line k="Fecha de vencimiento" v={debt.dueDate} />
              <Line k="Cliente" v={customer.businessName} />
              <Line k="NIT" v={customer.nit} />
            </dl>
          </Card>

          <Card>
            <div className="flex justify-between">
              <span className="font-display font-bold text-ink">
                Monto a pagar
              </span>
              <span className="font-display text-lg font-extrabold text-ink">
                {bs(debt.amount)}
              </span>
            </div>
          </Card>

          {!paid && (
            <div className="flex items-start gap-2 rounded-xl bg-brand-50 p-3 text-[12px] text-brand-dark">
              <Info size={16} className="mt-0.5 shrink-0" />
              El pago se hace por QR y se acredita de inmediato a tu cuenta.
            </div>
          )}
        </div>
      </Screen>

      <div className="shrink-0 space-y-2 border-t border-hair bg-surface px-4 py-3">
        {paid ? (
          <a
            href={whatsappHref}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-white shadow-xs outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50"
            style={{ background: "#25D366" }}
          >
            <MessageCircle size={17} /> Volver al chat de WhatsApp
          </a>
        ) : (
          <Button
            size="lg"
            className="w-full"
            onClick={() => nav(`/deuda/${debt.id}/pago`)}
          >
            Pagar esta deuda
          </Button>
        )}
      </div>
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
