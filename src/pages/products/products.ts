import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductsService } from '../../providers/products/products';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {ProductCrudComponent} from '../../components/product-crud/product-crud';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  products: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private photoViewer: PhotoViewer, public modalCtrl:ModalController, public productService: ProductsService, public navParams: NavParams) {
         this.products = this.productService.getAllProducts();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }
openAddPage() {
    let ProductModal = this.modalCtrl.create(ProductCrudComponent, { page: 'add' });
    ProductModal.present();
  }
openEditPage(id) {
    let ProductModal = this.modalCtrl.create(ProductCrudComponent, { page: 'edit', id :id });
    ProductModal.present();
  }
delete(product){
   this.products.remove(product);
}
  viewImage(image){
this.photoViewer.show(image);
}
}
