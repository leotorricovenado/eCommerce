// Datos de ejemplo del módulo de pago de deudas (mora).
// Dominio separado del catálogo/carrito: acá solo se lista, se ve el detalle
// y se paga una deuda — no hay navegación cruzada hacia el catálogo.

export type DebtStatus = "vencida" | "por_vencer" | "vigente";

export interface Debt {
  id: string; // número de factura
  orderRef: string; // pedido de Grupo Venado que originó la factura
  concept: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: DebtStatus;
  daysOverdue?: number;
}

export const debts: Debt[] = [
  {
    id: "FAC-2024-0873",
    orderRef: "VN-2023-098",
    concept: "Pedido VN-2023-098",
    issueDate: "09 oct 2024",
    dueDate: "23 oct 2024",
    amount: 210.0,
    status: "vencida",
    daysOverdue: 12,
  },
  {
    id: "FAC-2024-0891",
    orderRef: "VN-2023-091",
    concept: "Pedido VN-2023-091",
    issueDate: "02 oct 2024",
    dueDate: "05 nov 2024",
    amount: 88.2,
    status: "por_vencer",
  },
  {
    id: "FAC-2024-0905",
    orderRef: "VN-2024-000",
    concept: "Pedido VN-2024-000",
    issueDate: "17 oct 2024",
    dueDate: "16 nov 2024",
    amount: 342.5,
    status: "vigente",
  },
];

export const debtStatusLabel: Record<DebtStatus, string> = {
  vencida: "Vencida",
  por_vencer: "Por vencer",
  vigente: "Vigente",
};

export function debtById(id: string): Debt | undefined {
  return debts.find((d) => d.id === id);
}

export function totalDebt(list: Debt[] = debts): number {
  return list.reduce((sum, d) => sum + d.amount, 0);
}
