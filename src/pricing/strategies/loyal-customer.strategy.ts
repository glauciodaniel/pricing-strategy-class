import { DiscountStrategy } from "../discount-strategy.interface";

export class LoyalCustomerStrategy implements DiscountStrategy {
  applyDiscount(price: number): number {
    return price * 0.9; // 10% de desconto
  }
}
