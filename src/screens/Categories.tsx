import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { StatusBar, TopBar, BottomNav } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { categories, catSolidBg, catText } from "@/data/catalog";

export function Categories() {
  const nav = useNavigate();
  return (
    <>
      <StatusBar />
      <TopBar title="Categorías" />
      <Screen className="bg-canvas">
        <div className="grid grid-cols-2 gap-3 p-4">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => nav(`/catalogo?cat=${c.key}`)}
              className={`flex h-32 flex-col justify-between rounded-2xl p-4 text-left shadow-xs outline-none transition-transform focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.98] ${catSolidBg[c.key]} ${catText[c.key]}`}
            >
              <ChevronRight size={20} className="self-end opacity-80" />
              <div>
                <p className="font-display text-[15px] font-bold leading-tight">
                  {c.label}
                </p>
                <p className="text-xs opacity-90">{c.count} productos</p>
              </div>
            </button>
          ))}
        </div>
      </Screen>
      <BottomNav />
    </>
  );
}
