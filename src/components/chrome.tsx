import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutGrid,
  Receipt,
  User,
  ShoppingCart,
  ChevronLeft,
  Signal,
  Wifi,
  BatteryFull,
} from "lucide-react";
import { useCart } from "@/state/cart";

/* ---------------- Logo de marca (venado + wordmark) ---------------- */

export function DeerMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path
        d="M9 8.5c1.4 1 2.2 1 3 .3M23 8.5c-1.4 1-2.2 1-3 .3M16 23l-5-11c2 1.6 3.4 1.6 5 .2 1.6 1.4 3 1.4 5-.2l-5 11Z"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Logo Grupo Venado (versión blanca) sobre tile de marca — funciona en cualquier fondo. */
export function VenadoLogo({
  className = "",
  rounded = "rounded-xl",
}: {
  className?: string;
  rounded?: string;
}) {
  return (
    <span className={`grid shrink-0 place-items-center bg-brand ${rounded} ${className}`}>
      <img
        src="/marcas/LogoVenadoBlanco.png"
        alt="Grupo Venado"
        className="h-[64%] w-[64%] object-contain"
      />
    </span>
  );
}

export function BrandWordmark() {
  return (
    <div className="flex items-center gap-2">
      <VenadoLogo className="h-8 w-8" />
      <div className="leading-none">
        <div className="font-display text-[15px] font-extrabold tracking-tight text-ink">
          eVenado
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">
          Catálogo
        </div>
      </div>
    </div>
  );
}

/* ---------------- Status bar (iOS-like) ---------------- */

export function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? "text-white" : "text-ink";
  return (
    <div
      className={`flex h-11 shrink-0 items-center justify-between px-5 pt-1 text-[13px] font-semibold ${c}`}
    >
      <span className="tabular-nums">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal size={15} />
        <Wifi size={15} />
        <BatteryFull size={17} />
      </div>
    </div>
  );
}

/* ---------------- TopBar ---------------- */

export function TopBar({
  title,
  onBack,
  right,
  showCart = true,
}: {
  title?: React.ReactNode;
  onBack?: () => void;
  right?: React.ReactNode;
  showCart?: boolean;
}) {
  const nav = useNavigate();
  const { count } = useCart();
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-hair bg-surface px-4">
      <div className="flex min-w-0 items-center gap-2">
        {onBack && (
          <button
            onClick={onBack}
            className="-ml-1 grid h-9 w-9 place-items-center rounded-full text-ink hover:bg-canvas"
            aria-label="Volver"
          >
            <ChevronLeft size={22} />
          </button>
        )}
        {title ? (
          <h1 className="truncate font-display text-[17px] font-bold text-ink">
            {title}
          </h1>
        ) : (
          <BrandWordmark />
        )}
      </div>
      <div className="flex items-center gap-1">
        {right}
        {showCart && (
          <button
            onClick={() => nav("/carrito")}
            className="relative grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-canvas"
            aria-label="Ver carrito"
          >
            <ShoppingCart size={21} />
            {count > 0 && (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white tabular-nums">
                {count}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}

/* ---------------- BottomNav ---------------- */

const navItems = [
  { to: "/inicio", label: "Inicio", icon: Home, end: true },
  { to: "/catalogo", label: "Catálogo", icon: LayoutGrid, end: false },
  { to: "/pedidos", label: "Pedidos", icon: Receipt, end: false },
  { to: "/perfil", label: "Perfil", icon: User, end: false },
];

export function BottomNav() {
  return (
    <nav className="flex shrink-0 items-stretch justify-around border-t border-hair bg-surface px-2 pb-1 pt-1.5">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className="group flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1 text-muted aria-[current=page]:text-brand"
        >
          <Icon size={22} />
          <span className="text-[11px] font-semibold">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
