import { BottomNav, StatusBar, TopBar } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { Button, Card } from "@/components/primitives";
import { customer } from "@/data/catalog";
import { bs } from "@/lib/format";
import {
  BadgeCheck,
  Check,
  LogOut,
  Mail,
  MapPin,
  MessageCircleMore,
  Phone,
  Tag,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/state/session";
import { useDelivery } from "@/state/delivery";

export function Profile() {
  const nav = useNavigate();
  const { phone } = useSession();
  const displayPhone = phone ? `+${phone}` : customer.phone;
  const [notifs, setNotifs] = useState(true);
  const { points, selectedId, select } = useDelivery();

  return (
    <>
      <StatusBar />
      <TopBar title="Mi Perfil" showCart={false} />
      <Screen className="bg-canvas">
        <div className="space-y-4 p-4">
          {/* Cliente */}
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-ink">
                  {customer.businessName}
                </h2>
                <p className="mt-0.5 text-xs text-muted">
                  NIT {customer.nit} · Cód. {customer.code}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-success-50 px-2 py-1 text-[11px] font-semibold text-success">
                <BadgeCheck size={13} /> {customer.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat
                icon={<Wallet size={16} />}
                label="Saldo disponible"
                value={bs(customer.balance)}
              />
              <Stat
                icon={<Tag size={16} />}
                label="Regla de precios"
                value={customer.priceList}
              />
            </div>
          </Card>

          {/* Logística */}
          <Section title="Información cliente">
            <InfoRow
              icon={<Phone size={16} />}
              label="WhatsApp vinculado"
              value={displayPhone}
            />
          </Section>

          {/* Puntos de entrega */}
          <div>
            <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-muted">
              Puntos de entrega
            </h3>
            <Card padding="" className="divide-y divide-hair overflow-hidden">
              {points.map((p) => {
                const active = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => select(p.id)}
                    className="flex w-full items-start gap-3 p-4 text-left outline-none transition-colors hover:bg-canvas focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <span className="mt-0.5 text-brand">
                      <MapPin size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-ink">
                          {p.label}
                        </p>
                        {active && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-1.5 py-0.5 text-[10px] font-semibold text-brand">
                            Predeterminada
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-muted">{p.address}</p>
                    </div>
                    {active && (
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </Card>
            <p className="mt-1.5 px-1 text-[11px] text-muted">
              Los pedidos se despachan al punto de entrega elegido en el carrito.
            </p>
          </div>

          {/* Asesor */}
          <Section title="Información del asesor">
            <div className="flex items-center gap-3 p-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand">
                <MessageCircleMore size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">
                  {customer.advisor.name}
                </p>
                <p className="text-xs text-muted">{customer.advisor.role}</p>
              </div>
              <button
                className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white outline-none transition-colors hover:bg-brand-dark focus-visible:ring-[3px] focus-visible:ring-ring/50"
                aria-label="Enviar mensaje"
              >
                <Mail size={16} />
              </button>
            </div>
          </Section>

          {/* Ajustes */}
          <Section title="Ajustes">
            <Toggle
              label="Notificaciones de pedidos"
              desc="Avisos sobre el estado de tu pedido"
              on={notifs}
              onChange={setNotifs}
            />
          </Section>

          <Button
            variant="outline"
            size="lg"
            className="w-full text-danger"
            onClick={() => nav("/login")}
          >
            <LogOut size={17} /> Cerrar sesión
          </Button>
        </div>
      </Screen>
      <BottomNav />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-muted">
        {title}
      </h3>
      <Card padding="" className="divide-y divide-hair overflow-hidden">
        {children}
      </Card>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-canvas p-3">
      <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted">
        {icon}
        {label}
      </span>
      <p className="mt-1 font-display text-base font-bold text-ink">{value}</p>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 p-4">
      <span className="mt-0.5 text-brand">{icon}</span>
      <div>
        <p className="text-[11px] font-medium text-muted">{label}</p>
        <p className="text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}

function Toggle({
  label,
  desc,
  on,
  onChange,
}: {
  label: string;
  desc: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 p-4">
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className="text-[11px] text-muted">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!on)}
        className={`relative h-6 w-11 shrink-0 rounded-full outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 ${
          on ? "bg-brand" : "bg-gray"
        }`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            on ? "left-0.5 translate-x-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
