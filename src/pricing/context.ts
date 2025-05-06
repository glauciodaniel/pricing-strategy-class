// Define o tipo ProductCategory
export type ProductCategory = "electronics" | "clothing" | "groceries";

// Define a interface PurchaseContext
export interface PurchaseContext {
  category: ProductCategory;
  quantity: number;
  unitPrice: number;
  date: Date;
  isLoyalCustomer: boolean;
}
