interface NotifyOrderConfirmedInput {
  phone: string;
  orderNumber: string;
  total: number;
}

// Atajo de demo: la propia web le avisa al bot cuando se "paga" el pedido
// dummy. En la arquitectura real esto vendría de un evento de Sales/Invoice.
export async function notifyOrderConfirmed({
  phone,
  orderNumber,
  total,
}: NotifyOrderConfirmedInput): Promise<void> {
  const baseUrl = import.meta.env.VITE_BOT_API_BASE_URL as string | undefined;
  const apiKey = import.meta.env.VITE_BOT_API_KEY as string | undefined;

  if (!baseUrl || !apiKey) {
    console.warn(
      "[botApi] VITE_BOT_API_BASE_URL / VITE_BOT_API_KEY no configuradas; " +
        "se omite la notificación al bot.",
    );
    return;
  }

  try {
    await fetch(`${baseUrl}/api/v1/demo/catalogo/pedido-confirmado/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({ phone, order_number: orderNumber, total }),
    });
  } catch (err) {
    console.warn("[botApi] No se pudo notificar el pedido al bot:", err);
  }
}

interface NotifyDebtPaidInput {
  phone: string;
  debtId: string;
  total: number;
}

// Mismo atajo de demo que notifyOrderConfirmed, para el módulo de pago de
// deudas: en la arquitectura real vendría de un evento de Collections/Invoice.
export async function notifyDebtPaid({
  phone,
  debtId,
  total,
}: NotifyDebtPaidInput): Promise<void> {
  const baseUrl = import.meta.env.VITE_BOT_API_BASE_URL as string | undefined;
  const apiKey = import.meta.env.VITE_BOT_API_KEY as string | undefined;

  if (!baseUrl || !apiKey) {
    console.warn(
      "[botApi] VITE_BOT_API_BASE_URL / VITE_BOT_API_KEY no configuradas; " +
        "se omite la notificación al bot.",
    );
    return;
  }

  try {
    await fetch(`${baseUrl}/api/v1/demo/deudas/pago-confirmado/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({ phone, debt_id: debtId, total }),
    });
  } catch (err) {
    console.warn("[botApi] No se pudo notificar el pago de deuda al bot:", err);
  }
}
