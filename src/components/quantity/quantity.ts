import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ProductsService } from '../../providers/products/products';

@Component({
  selector: 'quantity',
  templateUrl: 'quantity.html'
})
export class QuantityComponent {

  text: string;
  numbers: any[] = [
    { number: 5 }, { number: 10 }, { number: 15 }, { number: 20 }
  ]
  page: string;
  private quantity = 0;
  productId;
  constructor(public viewCtrl: ViewController, 
  public params: NavParams, 
  public translateService: TranslateService, 
  private productsService: ProductsService) {
    this.page = params.get('page')
    this.productId = params.get('productId');
  }
  private increment() {
    this.quantity += 10;
  }

  private decrement() {
    this.quantity -= 10;
  }
  changeNum(num) {
    this.quantity = num;
  }
  close() {
    this.viewCtrl.dismiss();
  }

  draw() {
    this.productsService.draw(this.productId, this.quantity).subscribe(res => {
      this.viewCtrl.dismiss(res);
      //console.log(res);
      //if (200 === res.status)
      //  this.close();
    });
  }
}