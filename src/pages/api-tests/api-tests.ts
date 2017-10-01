import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import { TranslateService } from '@ngx-translate/core';

import { Product } from '../../models/product';
import { ProductsService } from '../../providers/providers'
import { Round } from '../../models/round';
import { RoundsService } from '../../providers/providers'
import { User } from '../../models/user'
import { UserService } from '../../providers/providers'

const Minimum_Amount = 150000;
const Payment_Url = "https://yydb-9a6c4.firebaseapp.com/payment.html";

@IonicPage()
@Component({
  selector: 'page-api-tests',
  templateUrl: 'api-tests.html'
})
export class ApiTestsPage {

  user: User;
  preparingRounds: Round[];

  constructor(public ps: ProductsService, public rs: RoundsService, public us: UserService,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, private modalCtrl: ModalController,
    private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    this.user = this.us.getCurrentUser();
  }

  getPreparingRounds() {
    let callback = (results => {
      this.preparingRounds = results;
      results.forEach(r => {
        this.us.updateDrawsOfRound(r.id);
      });
    })
    this.rs.getPreparingRounds(callback);
  }

  buyDraws(round: Round) {
    let randomAmount = Math.floor(Math.random() * 5) + 1;

    // Check balance
    if (this.user.balance < randomAmount * round.drawPrice) {
      this.alertCtrl.create({
        title: "Not enough balance.",
        buttons: ['OK']
      }).present();
      return;
    }

    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    let callback = (deal => {
      loader.dismiss();
      this.showAlert(round.id, deal);
    })
    loader.present();
    this.rs.addDraws(round.id, randomAmount, callback);
  }

  showAlert(roundId: string, deal: number) {
    let msg = deal == 0 ? "Not enough draw" : `You bought ${deal} new draws.`;
    let alert = this.alertCtrl.create({
      title: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  showAllDraws(roundId: string) {
    let draws = this.user.draws[roundId];
    let msg = draws ? draws.toString() : "You have no draw";
    let alert = this.alertCtrl.create({
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  redirectToLogin() {
    const url = 'https://fir-ui-demo-84a6c.firebaseapp.com/widget#recaptcha=normal';
    this.openUrl(url);
  }

  makePayment(amount, bIsForOther, selectedId) {
    if (bIsForOther && !selectedId) {
      alert('You must select another user you want to top-up.');
      return;
    }
    let targetId = bIsForOther ? selectedId : this.user.id;
    let num = parseInt(amount);
    if (num < Minimum_Amount) {
      alert(`Minimum amount is: ${Minimum_Amount} Rupiah.`);
      return;
    }

    // WARNING: must convert to cents!
    num *= 100;
    let url = `${Payment_Url}?user_id=${this.user.id}&target_id=${targetId}&amount=${num}`;
    this.openUrl(url);
  }

  openUrl(url: string) {
    const options: InAppBrowserOptions = {
      location: 'no',
      clearcache: 'yes',
      clearsessioncache: 'yes',
      // android
      hardwareback: 'no',
      zoom: 'no',
      // ios
      disallowoverscroll: 'yes',
      toolbar: 'no'
    }
    const browser = this.iab.create(url, "_blank", options);
  }
}
