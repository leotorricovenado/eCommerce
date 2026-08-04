import { useNavigate } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { StatusBar, VenadoLogo } from "@/components/chrome";
import { Screen } from "@/components/DeviceFrame";
import { Button, Card } from "@/components/primitives";
import { customer } from "@/data/catalog";
import { useSession } from "@/state/session";

export function Login() {
  const nav = useNavigate();
  const { phone } = useSession();
  const displayPhone = phone ? `+${phone}` : customer.phone;
  return (
    <>
      <StatusBar />
      <Screen className="bg-surface">
        <div className="flex min-h-full flex-col px-6 pb-8 pt-10">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <VenadoLogo className="h-16 w-16" rounded="rounded-2xl" />
            <h1 className="mt-4 font-display text-2xl font-extrabold text-ink">
              eVenado Catálogo
            </h1>
            <p className="mt-2 max-w-[18rem] text-sm text-muted">
              Hacé tus pedidos de Grupo Venado directo, rápido y sin llamadas.
            </p>

            <div className="mt-6 flex items-center gap-2 rounded-full bg-success-50 px-4 py-2 text-[13px] font-semibold text-success">
              <MessageCircle size={16} />
              Abriste este catálogo desde WhatsApp
            </div>

            <Card className="mt-6 w-full bg-canvas text-left">
              <p className="text-[11px] font-medium text-muted">
                Te identificamos por tu número
              </p>
              <p className="mt-0.5 font-display text-lg font-bold text-ink">
                {displayPhone}
              </p>
              <p className="mt-1 text-[13px] text-muted">
                {customer.businessName} · {customer.code}
              </p>
            </Card>
          </div>

          <div>
            <Button size="lg" className="w-full" onClick={() => nav("/inicio")}>
              Continuar <ArrowRight size={18} />
            </Button>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-muted">
              Al continuar aceptás los términos de uso y la política de
              privacidad de Grupo Venado.
            </p>
          </div>
        </div>
      </Screen>
    </>
  );
}
