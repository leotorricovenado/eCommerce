import { useNavigate } from "react-router-dom";
import { ChevronRight, Receipt } from "lucide-react";
import { StatusBar, TopBar, BottomNav } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { bs } from "@/lib/format";

type OrderState =
  | "confirmado"
  | "preparacion"
  | "entregado"
  | "esperando";

const stateStyle: Record<OrderState, { label: string; cls: string }> = {
  confirmado: { label: "Confirmado", cls: "bg-brand-50 text-brand" },
  preparacion: { label: "En preparación", cls: "bg-warning-50 text-[#8a6d00]" },
  entregado: { label: "Entregado", cls: "bg-success-50 text-success" },
  esperando: { label: "Esperando pago", cls: "bg-canvas text-muted" },
};

const orders: {
  num: string;
  date: string;
  items: number;
  total: number;
  state: OrderState;
}[] = [
  { num: "VN-2024-001", date: "24 oct 2024", items: 3, total: 179.4, state: "confirmado" },
  { num: "VN-2024-000", date: "17 oct 2024", items: 6, total: 342.5, state: "entregado" },
  { num: "VN-2023-098", date: "09 oct 2024", items: 4, total: 210.0, state: "entregado" },
  { num: "VN-2023-091", date: "02 oct 2024", items: 2, total: 88.2, state: "entregado" },
];

export function OrderHistory() {
  const nav = useNavigate();
  return (
    <>
      <StatusBar />
      <TopBar title="Mis Pedidos" />
      <Screen className="bg-canvas">
        <div className="space-y-3 p-4">
          {orders.map((o) => {
            const s = stateStyle[o.state];
            return (
              <button
                key={o.num}
                onClick={() => nav(`/pedido/${o.num}`)}
                className="flex w-full items-center gap-3 rounded-2xl border border-hair bg-surface p-4 text-left"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                  <Receipt size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-sm font-bold text-ink">
                      #{o.num}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.cls}`}
                    >
                      {s.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">
                    {o.date} · {o.items} ítems
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-display text-sm font-bold text-ink">
                    {bs(o.total)}
                  </span>
                  <ChevronRight size={18} className="text-gray" />
                </div>
              </button>
            );
          })}
        </div>
      </Screen>
      <BottomNav />
    </>
  );
}
