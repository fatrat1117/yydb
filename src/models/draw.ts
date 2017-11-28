import { Subject, Observable } from "rxjs/Rx"
import { Product } from './product'
import { User } from './user'

export class Draw {
  id: string;
  product: Product;
  user: User;
  winnerNumber: string; 
  countDown: Observable<number>;

  constructor(id: string, product: Product, user: User, winnerNumber: string) {
    this.id = id;
    this.product = product;
    this.user = user;
    this.winnerNumber = winnerNumber;
  }
}