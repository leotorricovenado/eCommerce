// Formato de moneda y cálculos fiscales para Bolivia.
// Moneda: Boliviano (Bs). Impuesto: IVA 13%.

export const IVA_RATE = 0.13;

export function bs(amount: number): string {
  return (
    "Bs " +
    amount.toLocaleString("es-BO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export interface OrderTotals {
  subtotal: number;
  discount: number;
  taxable: number;
  iva: number;
  total: number;
}

/**
 * Calcula los totales de un pedido. En Bolivia el IVA (13%) suele venir
 * incluido en el precio; acá lo mostramos desglosado sobre el neto con
 * descuento aplicado para transparencia.
 */
export function computeTotals(subtotal: number, discount = 0): OrderTotals {
  const taxable = Math.max(subtotal - discount, 0);
  const iva = taxable - taxable / (1 + IVA_RATE);
  return {
    subtotal,
    discount,
    taxable,
    iva,
    total: taxable,
  };
}
