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

  buyDraws(roundId: string) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    let callback = (deal => {
      loader.dismiss();
      this.showAlert(roundId, deal);
    })
    loader.present();
    this.rs.addDraws(roundId, Math.floor(Math.random() * 5) + 1, callback);
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
    const options: InAppBrowserOptions = {
      zoom: 'no',
      disallowoverscroll: 'yes'
    }
    const url = 'https://fir-ui-demo-84a6c.firebaseapp.com/widget#recaptcha=normal';
    const browser = this.iab.create(url, "_blank", options);
    //browser.show();
  }

  makePayment() {
  }
}
