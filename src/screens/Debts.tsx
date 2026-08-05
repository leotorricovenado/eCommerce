import { useNavigate } from "react-router-dom";
import { AlertTriangle, ChevronRight, Receipt } from "lucide-react";
import { StatusBar, TopBar } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { Card } from "@/components/primitives";
import { debts, debtStatusLabel, totalDebt, type DebtStatus } from "@/data/debts";
import { customer } from "@/data/catalog";
import { bs } from "@/lib/format";
import { useDebts } from "@/state/debts";

const statusStyle: Record<DebtStatus, string> = {
  vencida: "bg-danger-50 text-danger",
  por_vencer: "bg-warning-50 text-[#8a6d00]",
  vigente: "bg-brand-50 text-brand",
};

export function Debts() {
  const nav = useNavigate();
  const { isPaid } = useDebts();
  const pending = debts.filter((d) => !isPaid(d.id));
  const total = totalDebt(pending);

  return (
    <>
      <StatusBar />
      <TopBar title="Mis Deudas" onBack={() => nav("/")} showCart={false} />
      <Screen className="bg-canvas">
        <div className="space-y-4 p-4">
          <Card className="bg-brand text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
              Total pendiente
            </p>
            <p className="mt-1 font-display text-3xl font-extrabold">
              {bs(total)}
            </p>
            <p className="mt-1 text-[12px] text-white/80">
              {customer.businessName} · {pending.length} factura
              {pending.length === 1 ? "" : "s"} pendiente
              {pending.length === 1 ? "" : "s"}
            </p>
          </Card>

          {pending.length === 0 ? (
            <Card className="items-center py-8 text-center">
              <p className="text-sm font-semibold text-ink">
                No tenés facturas pendientes 🎉
              </p>
              <p className="mt-1 text-xs text-muted">
                Tu cuenta está al día con Grupo Venado.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {pending.map((d) => (
                <button
                  key={d.id}
                  onClick={() => nav(`/deuda/${d.id}`)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-hair bg-surface p-4 text-left shadow-xs outline-none transition-colors hover:bg-canvas focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                      d.status === "vencida"
                        ? "bg-danger-50 text-danger"
                        : "bg-brand-50 text-brand"
                    }`}
                  >
                    {d.status === "vencida" ? (
                      <AlertTriangle size={20} />
                    ) : (
                      <Receipt size={20} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-sm font-bold text-ink">
                        #{d.id}
                      </p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyle[d.status]}`}
                      >
                        {debtStatusLabel[d.status]}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted">
                      Vence {d.dueDate}
                      {d.status === "vencida" && d.daysOverdue
                        ? ` · ${d.daysOverdue} días de mora`
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-display text-sm font-bold text-ink">
                      {bs(d.amount)}
                    </span>
                    <ChevronRight size={18} className="text-gray" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </Screen>
    </>
  );
}
