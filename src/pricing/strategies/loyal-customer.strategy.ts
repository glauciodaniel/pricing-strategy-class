import { DiscountStrategy } from "../discount-strategy.interface";

// Se o cliente é um cliente fiel, aplica 10% de desconto, senão aplica 0% de desconto
export class LoyalCustomerStrategy implements DiscountStrategy {
  applyDiscount(price: number): number {
    // Assuming the price already includes unit price * quantity
    const isLoyalCustomer = true; // Replace with actual logic to determine loyalty
    return isLoyalCustomer ? price * 0.9 : price;
  }
}
