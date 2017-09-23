import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform, AlertController, ViewController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { Product } from '../../models/product';
import { ProductsService } from '../../providers/providers'
import { Round } from '../../models/round';
import { RoundsService } from '../../providers/providers'
import { Items } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-api-tests',
  templateUrl: 'api-tests.html'
})
export class ApiTestsPage {
  prepareRounds: Round[];

  constructor(public ps: ProductsService, public rs: RoundsService, 
              private alertCtrl: AlertController, private viewCtrl: ViewController) {
  }

  getPreparingRounds() {
    let callback = (results => {
      this.prepareRounds = results;
    })
    this.rs.getPreparingRounds(callback);
  }

  randomDraw(roundId: string) {
    this.rs.addDraws(roundId, Math.floor(Math.random() * 5) + 1);
  }
}
