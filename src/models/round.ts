import { Product } from './product'

export class  Round {
  id: string;
  product: Product;

  constructor(id: string, product: Product) {
    this.id = id;
    this.product = product;
  }
}
