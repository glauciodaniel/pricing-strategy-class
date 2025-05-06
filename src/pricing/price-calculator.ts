import { PricingContext } from "./context";
import { DiscountStrategy } from "./discount-strategy.interface";

export class PriceCalculator {
  private context: PricingContext;

  constructor(strategy: DiscountStrategy) {
    this.context = new PricingContext(strategy);
  }

  setStrategy(strategy: DiscountStrategy): void {
    this.context.setStrategy(strategy);
  }

  calculatePrice(originalPrice: number): number {
    return this.context.calculatePrice(originalPrice);
  }
}
