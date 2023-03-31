import { Product } from './products';

export interface Carts {
  carts: Array<Cart>;
}

export interface Cart {
  id: Number;
  products: Array<Product>;
}
