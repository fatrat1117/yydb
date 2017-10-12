import { Observable } from "rxjs/Rx"
import { Product } from './product'

export class Round {
  id: string;
  product: Product;
  drawCounts: DrawCounts;
  drawPrice: number;  // price in cents
  status: string; // preparing/processing/end
  resultTime: number;
  secondsLeft: Observable<number>;

  constructor(id: string, product: Product, drawPrice: number, status: string) {
    this.id = id;
    this.product = product;
    this.drawCounts = new DrawCounts();
    this.drawPrice = drawPrice;
    this.status = status;
  }

  setResultTime(timestamp: number) {
    this.resultTime = timestamp;
    let counter = this.getSecondsDiff();
    if (counter > 0) {
      this.secondsLeft = Observable.timer(0, 1000)
        .map(() => counter > 0 ? counter-- : 0);
    } else {
      this.secondsLeft = Observable.of(0);
    }
  }

  getSecondsDiff() {
    let s = this.resultTime - Date.now();
    return s > 0 ? Math.floor(s / 1000) : 0;
  }
}

class DrawCounts {
  current: number;
  target: number;

  constructor() {
    this.current = 0;
    this.target = 0;
  }
}
