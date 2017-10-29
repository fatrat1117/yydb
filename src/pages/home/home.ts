import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Round } from '../../models/round';
import { ProductsService } from '../../providers/providers'
import { TableViewPage } from '../table-view/table-view';

import { SearchPage } from '../search/search';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  launchedProducts = [];
  //preparingRounds: Round[];
  constructor(public navCtrl: NavController, 
  public modalCtrl: ModalController, 
  private ps: ProductsService) {
    //this.onPreparingRoundsReady = this.onPreparingRoundsReady.bind(this);
  }
  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    // always call this 1st!
    //this.addEventListeners();
    //this.rs.getPreparingRounds();
    // let cb = products => {
    //   this.launchedProducts = products;
    //   console.log(this.launchedProducts);
    // }
    this.launchedProducts = this.ps.getLaunchedProducts();
  }

  ionViewWillUnload() {
    //this.removeEventListeners();
  }

  addEventListeners() {
    //console.log('MePage Loaded');
    //document.addEventListener('PreparingRoundsReady', this.onPreparingRoundsReady);
  }

  removeEventListeners() {
    //document.removeEventListener('PreparingRoundsReady', this.onPreparingRoundsReady);
  }

  onPreparingRoundsReady(data: Event) {
    //this.preparingRounds = data['detail'];
  }

  tablepage() {
    //console.log('click');
    this.navCtrl.push(TableViewPage);
  }

  viewRoundDetails(id: string) {
    this.navCtrl.push(SearchPage, {id: id});
  }

}
