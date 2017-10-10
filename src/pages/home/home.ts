import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { Round, RoundCallback } from '../../models/round';
import { RoundsService } from '../../providers/providers'
import {TableViewPage} from '../table-view/table-view';
import { ProductsService } from '../../providers/products/products';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products: FirebaseListObservable<any>;
    preparingRounds: Round[];
  roundCallback: RoundCallback;
  constructor(public navCtrl: NavController, private rs: RoundsService, public productService: ProductsService, public modalCtrl: ModalController,  af: AngularFireDatabase) {
     this.products = this.productService.getAllProducts();
    this.roundCallback = {
      bIsActive: true,
      callback: (results => {
        console.log("callback from home");
        
        this.preparingRounds = results;
        // results.forEach(r => {
        //   this.us.updateDrawsOfRound(r.id);
        // });
      })
    }
    this.rs.getPreparingRounds(this.roundCallback);
  }
  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  tablepage() {
    console.log('click');
    this.navCtrl.push(TableViewPage);
  }
  
}
