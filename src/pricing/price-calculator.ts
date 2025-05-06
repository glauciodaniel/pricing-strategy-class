/**
-O PriceCalculator recebe uma lista de estratégias no construtor.
-Aplica todas as regras e soma os descontos.
-Garante que o desconto total não ultrapasse 15%.
-Calcula o preço final e arredonda com toFixed(2).
*/
import { PurchaseContext } from "./context";
import { DiscountStrategy } from "./discount-strategy.interface";

export class PriceCalculator {
  private strategies: DiscountStrategy[];

  constructor(strategies: DiscountStrategy[]) {
    this.strategies = strategies;
  }

  calculatePrice(price: number, context?: PurchaseContext): Number {
    let totalDiscount = 0;
    let discountedPrice = price;

    for (const strategy of this.strategies) {
      const discount = context
        ? strategy.applyDiscount(discountedPrice, context)
        : strategy.applyDiscount(price, undefined);
      totalDiscount += discount;
      discountedPrice -= discount;
    }

    // Limita o desconto total a 15%
    if (totalDiscount > price * 0.15) {
      discountedPrice = price * 0.9; // Aplica o desconto máximo de 15%
    }
    // Retorna o preço final como número
    return parseFloat(discountedPrice.toFixed(2));
  }
}
