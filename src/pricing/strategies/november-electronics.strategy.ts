import { PurchaseContext } from "../context";
import { DiscountStrategy } from "../discount-strategy.interface";

// A verificação do mês é feita com getMonth(), que retorna 0 para janeiro até 11 para dezembro.
// Aplica 7% de desconto se for eletrônico comprado em novembro.
export class NovemberElectronicsStrategy implements DiscountStrategy {
  applyDiscount(price: number, context?: PurchaseContext): number {
    // Verifica se o produto é da categoria "electronics" e se o mês é novembro (mês 10)
    return context?.category === "electronics" && context.date.getMonth() === 10
      ? price * 0.93
      : price;
  }
}
