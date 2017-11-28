import { Subject, Observable } from "rxjs/Rx"
import { Product } from './product'
import { User } from './user'

export class Draw {
  id: string;
  product: Product;
  user: User;
  winnerNumber: string; 
  time:string;
  count: number;
  countDown: Observable<number>;
  status: string;

  constructor(id: string, product: Product, user: User, winnerNumber: string, time: string) {
    this.id = id;
    this.product = product;
    this.user = user;
    this.winnerNumber = winnerNumber;
    this.time = new Date(time).toISOString();
  }
}