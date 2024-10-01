import { Product } from './product.interface';

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}
