import { PriceCalculator } from "../src/pricing/price-calculator";
import { BulkDiscountStrategy } from "../src/pricing/strategies/bulk-discount.strategy";
import { LoyalCustomerStrategy } from "../src/pricing/strategies/loyal-customer.strategy";
import { NovemberElectronicsStrategy } from "../src/pricing/strategies/november-electronics.strategy";

describe("PriceCalculator", () => {
  it("should apply loyal customer discount", () => {
    const calculator = new PriceCalculator(new LoyalCustomerStrategy());
    expect(calculator.calculatePrice(100)).toBe(90);
  });

  it("should apply bulk discount", () => {
    const calculator = new PriceCalculator(new BulkDiscountStrategy());
    expect(calculator.calculatePrice(100)).toBe(85);
  });

  it("should apply November electronics discount", () => {
    const calculator = new PriceCalculator(new NovemberElectronicsStrategy());
    expect(calculator.calculatePrice(100)).toBe(80);
  });

  it("should allow changing strategies dynamically", () => {
    const calculator = new PriceCalculator(new LoyalCustomerStrategy());
    expect(calculator.calculatePrice(100)).toBe(90);

    calculator.setStrategy(new BulkDiscountStrategy());
    expect(calculator.calculatePrice(100)).toBe(85);
  });
});
