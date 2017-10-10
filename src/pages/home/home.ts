import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Round } from '../../models/round';
import { RoundsService } from '../../providers/providers'
import { TableViewPage } from '../table-view/table-view';
import { ProductsService } from '../../providers/products/products';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products: FirebaseListObservable<any>;
  preparingRounds: Round[];
  constructor(public navCtrl: NavController, private rs: RoundsService, public productService: ProductsService, public modalCtrl: ModalController, af: AngularFireDatabase) {
    this.onPreparingRoundsReady = this.onPreparingRoundsReady.bind(this);
    this.products = this.productService.getAllProducts();
  }
  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    // always call this 1st!
    this.addEventListeners();
    this.rs.getPreparingRounds();
  }

  ionViewWillUnload() {
    this.removeEventListeners();
  }

  addEventListeners() {
    //console.log('MePage Loaded');
    document.addEventListener('PreparingRoundsReady', this.onPreparingRoundsReady);
  }

  removeEventListeners() {
    document.removeEventListener('PreparingRoundsReady', this.onPreparingRoundsReady);
  }

  onPreparingRoundsReady(data: Event) {
    this.preparingRounds = data['detail'];
  }

  tablepage() {
    console.log('click');
    this.navCtrl.push(TableViewPage);
  }

}
