import { Subject, Observable } from "rxjs/Rx"
import { Product } from './product'
import { User } from './user'

export class Draw {
  id: string;
  product: Product;
  user: User;
  winnerNumber: string; 
  time:string;
  numOfRecords: number;
  // countDown: Observable<number>;
  countDown: string;
  status: string;
  endTime: Date;
  intervalHandle: any;
  orderNum: number;
  records;

  constructor(id: string, product: Product, user: User, winnerNumber: string, time: string, numOfRecords: number) {
    this.records = [];
    this.id = id;
    this.product = product;
    this.user = user;
    this.winnerNumber = winnerNumber;
    this.endTime = new Date(time);
    this.time = this.endTime.toLocaleString();
    this.numOfRecords = numOfRecords;
    this.getTimeDiff = this.getTimeDiff.bind(this);

    this.intervalHandle = setInterval(this.getTimeDiff, 1000); 
  }


  getTimeDiff() {
    let nowTime: Date = new Date(); 
    let intervalTime: number = this.endTime.getTime() - nowTime.getTime();
    if(intervalTime <= 0) {
      clearInterval(this.intervalHandle);
      this.status = 'end';
      console.log('count down end');
    } else {
      let h: number = Math.floor(intervalTime/1000/60/60%24); 
      let m: number = Math.floor(intervalTime/1000/60%60); 
      let s: number = Math.floor(intervalTime/1000%60);
      let hour: string = h < 10 ? '0' + h : h.toString();
      let minute: string = m < 10 ? '0' + m : m.toString();
      let second: string = s < 10 ? '0' + s : s.toString();
      this.countDown = hour + ':'+ minute + ':' + second;
      this.status = 'processing';
      console.log('count down: ' + this.countDown);
    }
    
  }

}