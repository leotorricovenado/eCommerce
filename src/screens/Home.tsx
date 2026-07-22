import { useNavigate } from "react-router-dom";
import { Search, LayoutGrid, ShoppingCart, Receipt } from "lucide-react";
import { StatusBar, TopBar, BottomNav } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { ProductCard } from "@/components/ProductCard";
import {
  categories,
  products,
  brands,
  brandLogo,
  customer,
  catSolidBg,
  catText,
} from "@/data/catalog";

const quickAccess = [
  { to: "/catalogo", label: "Ver catálogo", icon: LayoutGrid, tint: "bg-brand" },
  { to: "/carrito", label: "Mi carrito", icon: ShoppingCart, tint: "bg-accent" },
  { to: "/pedidos", label: "Mis pedidos", icon: Receipt, tint: "bg-cat-green" },
];

export function Home() {
  const nav = useNavigate();
  return (
    <>
      <StatusBar />
      <TopBar />
      <Screen className="bg-canvas">
        <div className="space-y-5 p-4">
          <div>
            <p className="text-sm text-muted">Hola,</p>
            <h2 className="font-display text-xl font-bold text-ink">
              {customer.businessName}
            </h2>
          </div>

          <button
            onClick={() => nav("/buscar")}
            className="flex w-full items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-left text-sm text-muted"
          >
            <Search size={18} />
            Buscar productos…
          </button>

          <div className="grid grid-cols-3 gap-3">
            {quickAccess.map(({ to, label, icon: Icon, tint }) => (
              <button
                key={to}
                onClick={() => nav(to)}
                className="flex flex-col items-center gap-2 rounded-2xl border border-hair bg-surface p-3"
              >
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl text-white ${tint}`}
                >
                  <Icon size={20} />
                </span>
                <span className="text-center text-[11px] font-semibold leading-tight text-ink">
                  {label}
                </span>
              </button>
            ))}
          </div>

          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-display text-[15px] font-bold text-ink">
                Categorías
              </h3>
              <button
                onClick={() => nav("/categorias")}
                className="text-xs font-semibold text-brand"
              >
                Ver todas
              </button>
            </div>
            <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4">
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => nav(`/catalogo?cat=${c.key}`)}
                  className={`flex h-20 w-28 shrink-0 flex-col justify-end rounded-2xl p-3 text-left ${catSolidBg[c.key]} ${catText[c.key]}`}
                >
                  <span className="text-[12px] font-bold leading-tight">
                    {c.label}
                  </span>
                  <span className="text-[10px] opacity-90">
                    {c.count} productos
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-2 font-display text-[15px] font-bold text-ink">
              Productos relevantes
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-2 font-display text-[15px] font-bold text-ink">
              Nuestras marcas
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {brands.map((b) => (
                <div
                  key={b}
                  className="grid h-16 place-items-center rounded-2xl border border-hair bg-surface p-3"
                >
                  <img
                    src={brandLogo[b]}
                    alt={b}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </Screen>
      <BottomNav />
    </>
  );
}
