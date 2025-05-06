import { PurchaseContext } from "../context";
import { DiscountStrategy } from "../discount-strategy.interface";

export class BulkDiscountStrategy implements DiscountStrategy {
  applyDiscount(price: number, context?: PurchaseContext): number {
    let discountedPrice = price * 0.85; // 15% de desconto padrão

    // Aplica desconto adicional de 5% se o cliente comprar mais de 10 unidades
    if (context && context.quantity > 10) {
      discountedPrice *= 0.95; // Aplica mais 5% de desconto
    }

    return discountedPrice;
  }
}
