import { DiscountStrategy } from "../discount-strategy.interface";

export class BulkDiscountStrategy implements DiscountStrategy {
  applyDiscount(price: number): number {
    return price * 0.85; // 15% de desconto
  }
}
