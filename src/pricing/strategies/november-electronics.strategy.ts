import { DiscountStrategy } from "../discount-strategy.interface";

export class NovemberElectronicsStrategy implements DiscountStrategy {
  applyDiscount(price: number): number {
    return price * 0.8; // 20% de desconto
  }
}
