import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import { productImage, type Product, type StockLevel } from "@/data/catalog";

/* ---------------- Button ---------------- */

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark active:bg-brand-dark",
  accent: "bg-accent text-white hover:bg-accent-dark active:bg-accent-dark",
  outline: "border border-line bg-surface text-ink hover:bg-canvas",
  ghost: "text-brand hover:bg-brand-50",
};
const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm rounded-xl",
  lg: "h-12 px-5 text-[15px] rounded-xl",
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
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------------- StockBadge ---------------- */

const stockMap: Record<StockLevel, { label: string; cls: string }> = {
  in: { label: "En stock", cls: "bg-success-50 text-success" },
  low: { label: "Pocas unidades", cls: "bg-warning-50 text-[#9a7400]" },
  out: { label: "Sin stock", cls: "bg-danger-50 text-danger" },
};

export function StockBadge({ level }: { level: StockLevel }) {
  const s = stockMap[level];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${s.cls}`}
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
      className={`overflow-hidden rounded-xl bg-gradient-to-br ${tintBg[product.tint] ?? tintBg["cat-red"]} ${className}`}
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
  const btn =
    size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const box = size === "sm" ? "min-w-7 text-sm" : "min-w-9 text-[15px]";
  return (
    <div
      className={`inline-flex items-center rounded-lg border border-line bg-surface ${disabled ? "opacity-40" : ""}`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(Math.max(0, value - 1))}
        className={`grid ${btn} place-items-center text-muted hover:text-ink`}
        aria-label="Quitar uno"
      >
        <Minus size={16} />
      </button>
      <span
        className={`grid ${box} place-items-center text-center font-semibold tabular-nums`}
      >
        {value}
      </span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(value + 1)}
        className={`grid ${btn} place-items-center text-brand hover:text-brand-dark`}
        aria-label="Agregar uno"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
