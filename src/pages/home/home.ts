import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {TableViewPage} from '../table-view/table-view';
import { ProductsService } from '../../providers/products/products';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public productService: ProductsService, public modalCtrl: ModalController,  af: AngularFireDatabase) {
     this.products = this.productService.getAll();
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
