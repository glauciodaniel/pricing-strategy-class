import { PurchaseContext } from "../src/pricing/context";
import { DiscountStrategy } from "../src/pricing/discount-strategy.interface";
import { PriceCalculator } from "../src/pricing/price-calculator";

describe("PriceCalculator", () => {
  let calculator: PriceCalculator;

  const LoyalCustomerStrategy: DiscountStrategy = {
    applyDiscount: (price: number) => price * 0.1,
  };

  const BulkDiscountStrategy: DiscountStrategy = {
    applyDiscount: (price: number) => price * 0.05,
  };

  const NovemberElectronicsStrategy: DiscountStrategy = {
    applyDiscount: (price: number) => price * 0.07,
  };

  beforeEach(() => {
    calculator = new PriceCalculator([
      LoyalCustomerStrategy,
      BulkDiscountStrategy,
      NovemberElectronicsStrategy,
    ]);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should apply only loyal customer discount", () => {
    jest.setSystemTime(new Date("2023-05-01"));
    const context: PurchaseContext = {
      category: "electronics",
      quantity: 1,
      unitPrice: 100,
      date: new Date(),
      isLoyalCustomer: true,
    };

    const price = context.isLoyalCustomer
      ? LoyalCustomerStrategy.applyDiscount(context.unitPrice, context)
      : 0;
    const finalPrice = calculator.calculatePrice(context.unitPrice - price);
    expect(finalPrice).toBe("76.50");
  });

  it("should apply loyal + bulk discount capped at 15%", () => {
    jest.setSystemTime(new Date("2023-05-01"));
    const context: PurchaseContext = {
      category: "electronics",
      quantity: 20,
      unitPrice: 100,
      date: new Date(),
      isLoyalCustomer: true,
    };

    const loyalDiscount = context.isLoyalCustomer
      ? LoyalCustomerStrategy.applyDiscount(context.unitPrice, context)
      : 0;
    const bulkDiscount =
      context.quantity >= 10
        ? BulkDiscountStrategy.applyDiscount(context.unitPrice, context)
        : 0;
    const totalDiscount = Math.min(
      loyalDiscount + bulkDiscount,
      context.unitPrice * 0.15
    );

    const finalPrice = calculator.calculatePrice(
      context.unitPrice - totalDiscount
    );
    expect(finalPrice).toBe(85.0);
  });

  it("should apply only November electronics discount", () => {
    jest.setSystemTime(new Date("2023-11-15"));
    const context: PurchaseContext = {
      category: "electronics",
      quantity: 1,
      unitPrice: 100,
      date: new Date(),
      isLoyalCustomer: false,
    };

    const isNovemberElectronics =
      context.category === "electronics" &&
      new Date(context.date).getMonth() === 10;
    const discount = isNovemberElectronics
      ? NovemberElectronicsStrategy.applyDiscount(context.unitPrice, context)
      : 0;

    const finalPrice = calculator.calculatePrice(context.unitPrice - discount);
    expect(finalPrice).toBe("93.00");
  });

  it("should apply all three discounts but cap at 15%", () => {
    jest.setSystemTime(new Date("2023-11-15"));
    const context: PurchaseContext = {
      category: "electronics",
      quantity: 20,
      unitPrice: 100,
      date: new Date(),
      isLoyalCustomer: true,
    };

    const loyalDiscount = context.isLoyalCustomer
      ? LoyalCustomerStrategy.applyDiscount(context.unitPrice, context)
      : 0;
    const bulkDiscount =
      context.quantity >= 10
        ? BulkDiscountStrategy.applyDiscount(context.unitPrice, context)
        : 0;
    const isNovemberElectronics =
      context.category === "electronics" &&
      new Date(context.date).getMonth() === 10;
    const novemberDiscount = isNovemberElectronics
      ? NovemberElectronicsStrategy.applyDiscount(context.unitPrice, context)
      : 0;

    const totalDiscount = Math.min(
      loyalDiscount + bulkDiscount + novemberDiscount,
      context.unitPrice * 0.15
    );

    const finalPrice = calculator.calculatePrice(
      context.unitPrice - totalDiscount
    );
    expect(finalPrice).toBe("85.00");
  });

  it("should apply no discounts", () => {
    jest.setSystemTime(new Date("2023-05-01"));
    const context: PurchaseContext = {
      category: "electronics",
      quantity: 1,
      unitPrice: 100,
      date: new Date(),
      isLoyalCustomer: false,
    };

    const finalPrice = calculator.calculatePrice(context.unitPrice);
    expect(finalPrice).toBe("100.00");
  });
});
