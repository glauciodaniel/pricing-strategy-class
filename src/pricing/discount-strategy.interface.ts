import { PurchaseContext } from "./context";

export interface DiscountStrategy {
  applyDiscount(price: number, context: PurchaseContext | undefined): number;
}
