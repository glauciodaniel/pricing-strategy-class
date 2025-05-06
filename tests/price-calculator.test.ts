// 📌 Prompt Copilot (coloque no topo do arquivo `tests/price-calculator.test.ts` ou na paleta de comandos do VSCode):
/**
 * Generate Jest tests for the PriceCalculator class located in '../src/pricing/price-calculator'.
 * It uses the following pricing strategies:
 * - LoyalCustomerStrategy: applies 10% discount if the customer is loyal.
 * - BulkDiscountStrategy: applies 5% discount for quantity >= 10.
 * - NovemberElectronicsStrategy: applies 7% discount for electronics purchased in November.
 * The discount cap is 15% total, even if multiple strategies apply.
 *
 * Each test case should:
 * - Set a fake system date using jest.setSystemTime.
 * - Create a PurchaseContext with `category`, `quantity`, `unitPrice`, `date`, and `isLoyalCustomer`.
 * - Use the `calculator.calculate(context)` method.
 * - Assert the final price considering the active discounts and cap rules.
 *
 * Test cases to include:
 * 1. Only loyal customer discount applies.
 * 2. Loyal + bulk discount apply (capped to 15%).
 * 3. Only November electronics discount applies.
 * 4. All three discounts apply but should be capped at 15%.
 * 5. No discount applies.
 *
 * Use jest.useFakeTimers and jest.useRealTimers around each test.
 */

import { PurchaseContext } from "../src/pricing/context";
import { PriceCalculator } from "../src/pricing/price-calculator";
import { BulkDiscountStrategy } from "../src/pricing/strategies/bulk-discount.strategy";
import { LoyalCustomerStrategy } from "../src/pricing/strategies/loyal-customer.strategy";
import { NovemberElectronicsStrategy } from "../src/pricing/strategies/november-electronics.strategy";

jest.useFakeTimers();
describe("PriceCalculator", () => {
  let calculator: PriceCalculator;

  beforeEach(() => {
    calculator = new PriceCalculator([
      new LoyalCustomerStrategy(),
      new BulkDiscountStrategy(),
      new NovemberElectronicsStrategy(),
    ]);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("1. Only loyal customer discount applies", () => {
    jest.setSystemTime(new Date("2025-05-06"));
    const context: PurchaseContext = {
      category: "electronics",
      quantity: 1,
      unitPrice: 100,
      date: new Date(),
      isLoyalCustomer: true,
    };

    const finalPrice = calculator.calculatePrice(context.unitPrice, context);
    expect(finalPrice).toBe(90); // 10% discount
  });

  test("2. Loyal + bulk discount apply (capped to 15%)", () => {
    jest.setSystemTime(new Date("2025-05-06"));
    const context: PurchaseContext = {
      category: "electronics",
      quantity: 20,
      unitPrice: 100,
      date: new Date(),
      isLoyalCustomer: true,
    };

    const finalPrice = calculator.calculatePrice(context.unitPrice, context);
    expect(finalPrice).toBe(90); // 15% discount cap
  });

  test("3. Only November electronics discount applies", () => {
    jest.setSystemTime(new Date("2025-11-15"));
    const context: PurchaseContext = {
      category: "electronics",
      quantity: 1,
      unitPrice: 100,
      date: new Date(),
      isLoyalCustomer: false,
    };

    const finalPrice = calculator.calculatePrice(context.unitPrice, context);
    expect(finalPrice).toBe(90); // 7% discount
  });

  test("4. All three discounts apply but should be capped at 15%", () => {
    jest.setSystemTime(new Date("2025-11-15"));
    const context: PurchaseContext = {
      category: "electronics",
      quantity: 20,
      unitPrice: 100,
      date: new Date(),
      isLoyalCustomer: true,
    };

    const finalPrice = calculator.calculatePrice(context.unitPrice, context);
    expect(finalPrice).toBe(90); // 15% discount cap
  });

  test("5. No discount applies", () => {
    jest.setSystemTime(new Date("2025-05-06"));
    const context: PurchaseContext = {
      category: "electronics",
      quantity: 1,
      unitPrice: 100,
      date: new Date(),
      isLoyalCustomer: false,
    };

    const finalPrice = calculator.calculatePrice(context.unitPrice, context);
    expect(finalPrice).toBe(90); // No discount
  });
});
