import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the QuantityComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'quantity',
  templateUrl: 'quantity.html'
})
export class QuantityComponent {

  text: string;
  numbers: any[] = [
   {number: 5}, {number: 10},{ number: 15},{ number: 20}
  ]
  page:string;
  private quantity = 0;
  constructor(public viewCtrl: ViewController, public params: NavParams, public translateService: TranslateService,) {
   this.page = params.get('page')

  }
  private increment () {
    this.quantity += 10;
  }

  private decrement () {
    this.quantity -= 10;
  }
  changeNum(num){
    this.quantity = num;
  }
  close() {
          this.viewCtrl.dismiss();
        }
}
