import { Product } from './product'

export class Round {
  id: string;
  product: Product;
  drawCounts: DrawCounts;
  drawPrice: number;  // price in cents

  constructor(id: string, product: Product, drawPrice: number) {
    this.id = id;
    this.product = product;
    this.drawCounts = new DrawCounts();
    this.drawPrice = drawPrice;
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
