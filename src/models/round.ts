import { Subject, Observable } from "rxjs/Rx"
import { Product } from './product'

export class Round {
  id: string;
  product: Product;
  drawCounts: DrawCounts;
  drawPrice: number;  // price in cents
  status: string; // preparing/processing/end
  resultTime: number;
  result: number;
  countDown: Observable<number>;

  constructor(id: string, product: Product, drawPrice: number, status: string) {
    this.id = id;
    this.product = product;
    this.drawCounts = new DrawCounts();
    this.drawPrice = drawPrice;
    this.status = status;
  }

  setResultTime(timestamp: number, result: number) {
    if (this.countDown != undefined)
      return;
    this.resultTime = timestamp;
    this.result = result;
    let counter = this.getSecondsDiff();

    if (counter > 0) {
      /*
      let subject = new Subject();
      this.countDown = Observable.create(e => subject = e);

      let interval = setInterval(() => {
        if (counter-- == 0) {
          clearInterval(interval);
          this.status = 'end';
        }
        subject.next(counter--);
      }, 1000);
      */
      
      this.countDown = Observable.interval(1000).startWith(0).map(() => {
        if (--counter == 0)
          this.status = 'end';

        console.log(counter);
        return counter;
      }).take(counter).share();
    } else {
      this.status = 'end';
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
