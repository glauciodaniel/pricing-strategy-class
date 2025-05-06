import { DiscountStrategy } from "./discount-strategy.interface";

export class PricingContext {
  private strategy: DiscountStrategy;

  constructor(strategy: DiscountStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: DiscountStrategy): void {
    this.strategy = strategy;
  }

  calculatePrice(originalPrice: number): number {
    return this.strategy.applyDiscount(originalPrice);
  }
}
