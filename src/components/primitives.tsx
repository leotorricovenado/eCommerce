import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { Minus, Plus } from "lucide-react";
import { productImage, type Product, type StockLevel } from "@/data/catalog";
import { cn } from "@/lib/utils";

/* ---------------- Button ---------------- */
/* Anatomía inspirada en shadcn/ui: shadow-xs en variantes sólidas,
   font-medium, anillo de foco con --color-ring, disabled consistente. */

type Variant = "primary" | "accent" | "outline" | "secondary" | "ghost";
type Size = "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-xs hover:bg-brand-dark active:bg-brand-dark",
  accent:
    "bg-accent text-white shadow-xs hover:bg-accent-dark active:bg-accent-dark",
  outline:
    "border border-line bg-surface text-ink shadow-xs hover:bg-canvas",
  secondary: "bg-canvas text-ink hover:bg-line/60",
  ghost: "text-brand hover:bg-brand-50",
};
const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-12 px-5 text-[15px] rounded-lg",
  icon: "h-10 w-10 rounded-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium outline-none transition-all disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------------- Card ---------------- */
/* Contenedor genérico tipo shadcn Card (border + shadow-xs + radio grande),
   reemplaza el patrón repetido "rounded-2xl border border-hair bg-surface". */

export function Card({
  className = "",
  padding = "p-4",
  ...rest
}: {
  padding?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-hair bg-surface shadow-xs",
        padding,
        className,
      )}
      {...rest}
    />
  );
}

/* ---------------- Input ---------------- */

export function Input({
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink shadow-xs outline-none transition-colors placeholder:text-muted",
        "focus-visible:border-brand focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
      {...rest}
    />
  );
}

/* ---------------- StockBadge ---------------- */

const stockMap: Record<StockLevel, { label: string; cls: string }> = {
  in: { label: "En stock", cls: "border-success/20 bg-success-50 text-success" },
  low: {
    label: "Pocas unidades",
    cls: "border-warning/30 bg-warning-50 text-[#9a7400]",
  },
  out: { label: "Sin stock", cls: "border-danger/20 bg-danger-50 text-danger" },
};

export function StockBadge({ level }: { level: StockLevel }) {
  const s = stockMap[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium",
        s.cls,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}

/* ---------------- ProductThumb (placeholder de imagen) ---------------- */

const tintBg: Record<string, string> = {
  "cat-red": "from-cat-red/10 to-cat-red/[0.03]",
  "cat-blue": "from-cat-blue/10 to-cat-blue/[0.03]",
  "cat-yellow": "from-cat-yellow/15 to-cat-yellow/[0.04]",
  "cat-green": "from-cat-green/10 to-cat-green/[0.03]",
};

export function ProductThumb({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-gradient-to-br",
        tintBg[product.tint] ?? tintBg["cat-red"],
        className,
      )}
    >
      <img
        src={productImage(product)}
        alt={product.name}
        loading="lazy"
        className="h-full w-full object-contain p-[8%]"
      />
    </div>
  );
}

/* ---------------- QuantityStepper ---------------- */

export function QuantityStepper({
  value,
  onChange,
  size = "md",
  disabled = false,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: "sm" | "md";
  disabled?: boolean;
}) {
  const btn = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const box = size === "sm" ? "min-w-7 text-sm" : "min-w-9 text-[15px]";
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-line bg-surface shadow-xs",
        disabled && "opacity-50",
      )}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(Math.max(0, value - 1))}
        className={cn(
          "grid place-items-center rounded-l-lg text-muted outline-none transition-colors hover:text-ink hover:bg-canvas focus-visible:ring-[3px] focus-visible:ring-ring/50",
          btn,
        )}
        aria-label="Quitar uno"
      >
        <Minus size={16} />
      </button>
      <span
        className={cn(
          "grid place-items-center text-center font-medium tabular-nums",
          box,
        )}
      >
        {value}
      </span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(value + 1)}
        className={cn(
          "grid place-items-center rounded-r-lg text-brand outline-none transition-colors hover:text-brand-dark hover:bg-canvas focus-visible:ring-[3px] focus-visible:ring-ring/50",
          btn,
        )}
        aria-label="Agregar uno"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
