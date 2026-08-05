import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Video,
  Phone,
  MoreVertical,
  CheckCheck,
  Plus,
  Smile,
  Camera,
  Mic,
  ChevronRight,
  Loader2,
  CircleCheckBig,
  ShoppingCart,
  Wallet,
  Receipt,
} from "lucide-react";
import { StatusBar, VenadoLogo } from "@/components/chrome";
import { customer } from "@/data/catalog";
import { debtById, totalDebt } from "@/data/debts";
import { bs } from "@/lib/format";
import { useOrder } from "@/state/order";
import { useDelivery } from "@/state/delivery";
import { useDebts } from "@/state/debts";

// Colores WhatsApp (modo claro).
const WA = {
  header: "#008069",
  chat: "#efeae2",
  out: "#d9fdd3",
  inc: "#ffffff",
};

type Intent = "pedido" | "deuda" | null;

export function WhatsApp() {
  const nav = useNavigate();
  const { placed } = useOrder();
  const { selected } = useDelivery();
  const { paidId } = useDebts();
  const paidDebt = paidId ? debtById(paidId) : undefined;

  const [intent, setIntent] = useState<Intent>(
    placed ? "pedido" : paidDebt ? "deuda" : null,
  );
  const resolved = Boolean(placed || paidDebt);

  // step: 1 = saludo cliente · 2 = bot pregunta + chips · 3 = respuesta bot ·
  // 4 = tarjeta (catálogo o deudas).
  const [step, setStep] = useState(resolved ? 4 : 1);
  const [confirm, setConfirm] = useState(0); // confirmación post-acción
  const [typing, setTyping] = useState(false);
  const [opening, setOpening] = useState(false);
  const [openingLabel, setOpeningLabel] = useState("Abriendo eVenado…");
  const endRef = useRef<HTMLDivElement>(null);

  // Animación de introducción: saludo + pregunta de intención (solo si no
  // venimos de vuelta de un pedido/deuda ya resuelto).
  useEffect(() => {
    if (resolved) return;
    const t: number[] = [];
    t.push(window.setTimeout(() => setTyping(true), 700));
    t.push(
      window.setTimeout(() => {
        setTyping(false);
        setStep(2);
      }, 1900),
    );
    return () => t.forEach(clearTimeout);
  }, [resolved]);

  // Respuesta del bot una vez que el cliente elige qué quiere hacer.
  const pickIntent = (value: "pedido" | "deuda") => {
    setIntent(value);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setStep(3);
      window.setTimeout(() => setTyping(true), 300);
      window.setTimeout(() => {
        setTyping(false);
        setStep(4);
      }, 1400);
    }, 1100);
  };

  // Confirmación del pedido (cuando el cliente vuelve tras pagar el pedido).
  useEffect(() => {
    if (!placed) return;
    const t: number[] = [];
    t.push(window.setTimeout(() => setTyping(true), 700));
    t.push(
      window.setTimeout(() => {
        setTyping(false);
        setConfirm(1);
      }, 1800),
    );
    t.push(window.setTimeout(() => setConfirm(2), 2400));
    t.push(window.setTimeout(() => setTyping(true), 2800));
    t.push(
      window.setTimeout(() => {
        setTyping(false);
        setConfirm(3);
      }, 4000),
    );
    return () => t.forEach(clearTimeout);
  }, [placed]);

  // Confirmación del pago de deuda (cuando el cliente vuelve del módulo de
  // pago de deudas).
  useEffect(() => {
    if (!paidDebt) return;
    const t: number[] = [];
    t.push(window.setTimeout(() => setTyping(true), 700));
    t.push(
      window.setTimeout(() => {
        setTyping(false);
        setConfirm(1);
      }, 1800),
    );
    t.push(window.setTimeout(() => setConfirm(2), 2400));
    t.push(window.setTimeout(() => setTyping(true), 2800));
    t.push(
      window.setTimeout(() => {
        setTyping(false);
        setConfirm(3);
      }, 4000),
    );
    return () => t.forEach(clearTimeout);
  }, [paidDebt]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step, typing, confirm]);

  const openApp = (path: string, label: string) => {
    setOpeningLabel(label);
    setOpening(true);
    window.setTimeout(() => nav(path), 950);
  };

  return (
    <>
      <div style={{ background: WA.header }}>
        <StatusBar dark />
      </div>

      {/* Header WhatsApp */}
      <header
        className="flex items-center gap-2 px-2 py-2 text-white"
        style={{ background: WA.header }}
      >
        <ArrowLeft size={22} className="ml-1 shrink-0" />
        <VenadoLogo className="h-9 w-9" rounded="rounded-full" />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[15px] font-semibold">eVenado</p>
          <p className="text-[11px] text-white/80">en línea</p>
        </div>
        <Video size={20} className="mr-1" />
        <Phone size={19} className="mr-1" />
        <MoreVertical size={20} className="mr-1" />
      </header>

      {/* Chat */}
      <main
        className="flex-1 overflow-y-auto px-3 py-3"
        style={{ background: WA.chat }}
      >
        <div className="mx-auto mb-3 w-fit rounded-lg bg-white/70 px-3 py-1 text-[11px] text-[#54656f] shadow-sm">
          Hoy
        </div>

        <div className="flex flex-col gap-1.5">
          {/* Cliente */}
          {step >= 1 && (
            <Bubble side="out">
              Hola, buenas 👋
              <Meta time="14:20" />
            </Bubble>
          )}

          {/* Bot: saludo y pregunta de intención */}
          {step >= 2 && (
            <Bubble side="in">
              ¡Hola <b>{customer.businessName}</b>! 👋 Soy el asistente de
              eVenado. ¿En qué te ayudo hoy?
              <Meta time="14:20" in />
            </Bubble>
          )}

          {/* Chips de intención */}
          {step === 2 && intent === null && (
            <div className="flex flex-wrap gap-2 self-start">
              <Chip onClick={() => pickIntent("pedido")}>
                <ShoppingCart size={14} /> Hacer un pedido
              </Chip>
              <Chip onClick={() => pickIntent("deuda")}>
                <Wallet size={14} /> Pagar mi deuda
              </Chip>
            </div>
          )}

          {/* Respuesta elegida por el cliente */}
          {step >= 3 && intent && (
            <Bubble side="out">
              {intent === "pedido"
                ? "Quiero hacer un pedido de productos."
                : "Quiero pagar mi deuda."}
              <Meta time="14:20" />
            </Bubble>
          )}

          {/* Bot: respuesta de texto según intención */}
          {step >= 3 && intent === "pedido" && (
            <Bubble side="in">
              Con gusto. Te preparé tu catálogo con tus precios de la lista{" "}
              <b>{customer.priceList}</b>.
              <Meta time="14:20" in />
            </Bubble>
          )}
          {step >= 3 && intent === "deuda" && (
            <Bubble side="in">
              Claro, reviso tu cuenta… Tenés{" "}
              <b>{bs(totalDebt())}</b> pendiente en facturas. Te muestro el
              detalle para que puedas pagar.
              <Meta time="14:20" in />
            </Bubble>
          )}

          {/* Bot: tarjeta según intención */}
          {step >= 4 && intent === "pedido" && (
            <button
              onClick={() => openApp("/login", "Abriendo eVenado Catálogo…")}
              className="max-w-[82%] self-start overflow-hidden rounded-xl rounded-tl-sm bg-white text-left shadow-sm"
            >
              <div className="flex items-center gap-3 bg-brand/5 p-2.5">
                <VenadoLogo className="h-12 w-12" />
                <div className="min-w-0">
                  <p className="truncate font-display text-[14px] font-bold text-ink">
                    eVenado Catálogo
                  </p>
                  <p className="truncate text-[12px] text-muted">
                    Pedí lo que necesites, con tus precios.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 border-t border-hair py-2 text-[13px] font-semibold text-brand">
                Abrir catálogo <ChevronRight size={16} />
              </div>
              <Meta time="14:20" in />
            </button>
          )}
          {step >= 4 && intent === "deuda" && (
            <button
              onClick={() => openApp("/deudas", "Abriendo Mis Deudas…")}
              className="max-w-[82%] self-start overflow-hidden rounded-xl rounded-tl-sm bg-white text-left shadow-sm"
            >
              <div className="flex items-center gap-3 bg-brand/5 p-2.5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand text-white">
                  <Wallet size={22} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-[14px] font-bold text-ink">
                    Mis Deudas
                  </p>
                  <p className="truncate text-[12px] text-muted">
                    Consultá y pagá tus facturas pendientes.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 border-t border-hair py-2 text-[13px] font-semibold text-brand">
                Ver y pagar mis deudas <ChevronRight size={16} />
              </div>
              <Meta time="14:20" in />
            </button>
          )}

          {/* ---- Confirmación tras el pedido ---- */}
          {confirm >= 1 && placed && (
            <Bubble side="in">
              ✅ ¡Recibimos tu pago! Tu pedido <b>#{placed.number}</b> quedó{" "}
              <b>confirmado</b> por <b>{bs(placed.total)}</b>.
              <Meta time="14:27" in />
            </Bubble>
          )}

          {confirm >= 2 && placed && (
            <button
              onClick={() => nav(`/pedido/${placed.number}`)}
              className="max-w-[82%] self-start overflow-hidden rounded-xl rounded-tl-sm bg-white text-left shadow-sm"
            >
              <div className="flex items-center gap-3 p-2.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-success-50 text-success">
                  <CircleCheckBig size={22} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-[14px] font-bold text-ink">
                    Pedido #{placed.number}
                  </p>
                  <p className="truncate text-[12px] text-success">
                    Confirmado · {bs(placed.total)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 border-t border-hair py-2 text-[13px] font-semibold text-brand">
                Ver seguimiento <ChevronRight size={16} />
              </div>
              <Meta time="14:27" in />
            </button>
          )}

          {confirm >= 3 && placed && (
            <Bubble side="in">
              📦 Ya está en preparación para entregarse en {selected.label} (
              {selected.address}). Te aviso cuando salga para entrega. ¡Gracias
              por tu compra! 🦌
              <Meta time="14:27" in />
            </Bubble>
          )}

          {/* ---- Confirmación tras el pago de deuda ---- */}
          {confirm >= 1 && paidDebt && (
            <Bubble side="in">
              ✅ ¡Recibimos tu pago! La factura <b>#{paidDebt.id}</b> quedó{" "}
              <b>cancelada</b> por <b>{bs(paidDebt.amount)}</b>.
              <Meta time="14:27" in />
            </Bubble>
          )}

          {confirm >= 2 && paidDebt && (
            <button
              onClick={() => nav(`/deuda/${paidDebt.id}`)}
              className="max-w-[82%] self-start overflow-hidden rounded-xl rounded-tl-sm bg-white text-left shadow-sm"
            >
              <div className="flex items-center gap-3 p-2.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-success-50 text-success">
                  <Receipt size={20} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-[14px] font-bold text-ink">
                    Factura #{paidDebt.id}
                  </p>
                  <p className="truncate text-[12px] text-success">
                    Pagada · {bs(paidDebt.amount)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 border-t border-hair py-2 text-[13px] font-semibold text-brand">
                Ver comprobante <ChevronRight size={16} />
              </div>
              <Meta time="14:27" in />
            </button>
          )}

          {confirm >= 3 && paidDebt && (
            <Bubble side="in">
              🙌 Gracias por poner tu cuenta al día. Cualquier otra consulta,
              escribime por aquí. 🦌
              <Meta time="14:27" in />
            </Bubble>
          )}

          {/* Typing */}
          {typing && (
            <div className="flex w-14 items-center justify-center gap-1 self-start rounded-xl rounded-tl-sm bg-white px-3 py-3 shadow-sm">
              <Dot /> <Dot delay="0.15s" /> <Dot delay="0.3s" />
            </div>
          )}

          <div ref={endRef} />
        </div>
      </main>

      {/* Barra de input (decorativa) */}
      <div
        className="flex items-center gap-2 px-2 py-2"
        style={{ background: WA.chat }}
      >
        <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-2 text-[#54656f]">
          <Smile size={20} />
          <span className="flex-1 text-[14px]">Mensaje</span>
          <Plus size={19} className="rotate-45" />
          <Camera size={19} />
        </div>
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white"
          style={{ background: WA.header }}
        >
          <Mic size={20} />
        </span>
      </div>

      {/* Overlay: "abriendo página embebida" */}
      {opening && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-white">
          <VenadoLogo className="h-16 w-16" rounded="rounded-2xl" />
          <div className="flex items-center gap-2 text-sm font-medium text-muted">
            <Loader2 size={16} className="animate-spin" />
            {openingLabel}
          </div>
        </div>
      )}
    </>
  );
}

function Bubble({
  side,
  children,
}: {
  side: "in" | "out";
  children: React.ReactNode;
}) {
  const out = side === "out";
  return (
    <div
      className={`relative max-w-[82%] rounded-xl px-2.5 py-1.5 text-[14px] leading-snug text-ink shadow-sm ${
        out ? "self-end rounded-tr-sm" : "self-start rounded-tl-sm"
      }`}
      style={{ background: out ? WA.out : WA.inc }}
    >
      {children}
    </div>
  );
}

function Meta({ time, in: incoming }: { time: string; in?: boolean }) {
  return (
    <span className="ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[10px] text-[#667781]">
      {time}
      {!incoming && <CheckCheck size={14} className="text-[#53bdeb]" />}
    </span>
  );
}

function Dot({ delay = "0s" }: { delay?: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-[#9aa6ad]"
      style={{ animationDelay: delay }}
    />
  );
}

function Chip({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-brand bg-white px-3 py-1.5 text-[13px] font-semibold text-brand shadow-sm outline-none transition-colors hover:bg-brand-50 focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      {children}
    </button>
  );
}
