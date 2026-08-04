import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { Card } from "@/components/primitives";
import { useDelivery } from "@/state/delivery";

/**
 * Selector de punto de entrega (negocio/tienda/sucursal del cliente).
 * Se usa en el desglose del pedido (Carrito) para elegir a cuál de sus
 * direcciones registradas se despacha — nunca a un domicilio libre.
 */
export function DeliveryPointPicker() {
  const { points, selected, selectedId, select } = useDelivery();
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 rounded-lg text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        aria-expanded={open}
      >
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand">
          <MapPin size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium text-muted">
            Punto de entrega
          </p>
          <p className="truncate text-sm font-semibold text-ink">
            {selected.label}
          </p>
          <p className="truncate text-[12px] text-muted">{selected.address}</p>
        </div>
        <ChevronDown
          size={18}
          className={`mt-1 shrink-0 text-gray transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-3 space-y-1.5 border-t border-hair pt-3">
          {points.map((p) => {
            const active = p.id === selectedId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  select(p.id);
                  setOpen(false);
                }}
                className={`flex w-full items-start gap-3 rounded-lg p-2.5 text-left outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 ${
                  active ? "bg-brand-50" : "hover:bg-canvas"
                }`}
              >
                <span
                  className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${
                    active ? "border-brand bg-brand" : "border-line bg-surface"
                  }`}
                >
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-ink">
                    {p.label}
                  </p>
                  <p className="truncate text-[12px] text-muted">{p.address}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </Card>
  );
}

/** Versión de solo lectura para pantallas posteriores a la reserva. */
export function DeliveryPointSummary({ className = "" }: { className?: string }) {
  const { selected } = useDelivery();
  return (
    <p className={`text-[11px] text-muted ${className}`}>
      Entrega: {selected.label} — {selected.address}
    </p>
  );
}
