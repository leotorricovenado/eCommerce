import { Outlet } from "react-router-dom";

/**
 * Marco de teléfono para ver el prototipo en escritorio.
 * En pantallas chicas (móvil real) ocupa todo el viewport sin bisel.
 */
export function DeviceFrame() {
  return (
    <div className="min-h-full w-full bg-[#e9ecf1] sm:grid sm:place-items-center sm:p-6">
      <div className="relative h-[100dvh] w-full overflow-hidden bg-surface sm:h-[860px] sm:w-[402px] sm:rounded-[44px] sm:border-[10px] sm:border-[#0d1220] sm:shadow-2xl">
        {/* notch */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-20 hidden h-6 w-36 -translate-x-1/2 rounded-b-2xl bg-[#0d1220] sm:block" />
        <div className="flex h-full flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/**
 * Contenedor scrollable estándar de una pantalla (entre status bar y bottom nav).
 */
export function Screen({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={`flex-1 overflow-y-auto ${className}`}>{children}</main>
  );
}
