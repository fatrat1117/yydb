import { Product } from './product'

export class Round {
  id: string;
  product: Product;
  drawCounts: DrawCounts;

  constructor(id: string, product: Product) {
    this.id = id;
    this.product = product;
    this.drawCounts = new DrawCounts();
  }
}

export class DrawCounts {
  current: number;
  target: number;

  constructor() {
    this.current = 0;
    this.target = 0;
  }
}
