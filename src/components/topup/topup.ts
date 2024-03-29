import { Component } from '@angular/core';
import { ViewController, NavParams, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../providers/user/user';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
declare var snap: any;

/**
 * Generated class for the TopupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'topup',
  templateUrl: 'topup.html'
})
export class TopupComponent {

  text: string;
  amount: any;
  tokem: any;
  loader: any;
  constructor(public viewCtrl: ViewController, 
    public loadCtrl: LoadingController, 
    public http: Http, 
    public params: NavParams, 
    public translateService: TranslateService, 
  public userService: UserService) {
    console.log('Hello TopupComponent Component');
    this.text = 'Hello World';
  }
  topup() {
    this.loader = this.loadCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic U0ItTWlkLXNlcnZlci1fMGFaREVBcWdQX2xiVEZUUWYzYzlMSEo6'
      });
    let options = new RequestOptions({ headers: headers });

    let data = JSON.stringify({
      "transaction_details": {

        'order_id': Math.floor(100000 + Math.random() * 900000),
        'gross_amount': this.amount
      },
      "credit_card": {
        "secure": true
      }
    });
    let url  = ''
    if ((<any>window).cordova) {
      url = 'https://app.sandbox.midtrans.com/snap/v1/transactions';
     
   }else{
      url = '/v1';
   }
    return this.http.post(url, data, options)
      .subscribe(response => {
        // console.log(response);

        this.pay(response.json().token);
        this.loader.dismiss();

      }, err => {

        // console.log('err');
      });


  }
  setAmount(amnt) {
    this.amount = amnt;
  }
  close() {
    this.viewCtrl.dismiss();
  }
  pay(token) {
    let self = this;
    snap.pay(token, {
      onSuccess: function (result) {
        //this.viewCtrl.dismiss();
        if (200 == result.status_code && "accept" == result.fraud_status) {
          self.userService.topup(result.gross_amount).then(() => {
            self.viewCtrl.dismiss();
          });
        }
        //console.log('success'); console.log(result);
      },
      onPending: function (result) {
        console.log('pending'); console.log(result);
      },
      onError: function (result) {
        console.log('error'); console.log(result);
      },
      onClose: function () {
        console.log('customer closed the popup without finishing the payment');
      }
    })

  }
}
