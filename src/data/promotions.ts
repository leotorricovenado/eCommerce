import { productById, type Product } from "@/data/catalog";
import type { CartLine } from "@/state/cart";

// Bonificación de ejemplo: al llevar la mayonesa 1kg, se regala un ketchup.
// Mock fijo — en producción esta regla la resuelve el motor de PriceRules de DEAL.
export const BONUS_RULE = { triggerId: "mayonesa-1k", giftId: "ketchup-985" };

export function getBonusGift(lines: CartLine[]): Product | undefined {
  return lines.some((l) => l.id === BONUS_RULE.triggerId)
    ? productById(BONUS_RULE.giftId)
    : undefined;
}
