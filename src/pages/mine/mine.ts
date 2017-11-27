import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DEFAULT_AVATAR, CUSTOMER_SERVICE } from "../../providers/Constants";
import { FeedPage } from '../feed/feed';
import { QuantityComponent } from '../../components/quantity/quantity';
import { TopupComponent } from '../../components/topup/topup';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { BindPhonePage } from '../bind-phone/bind-phone';
import { ChangePasswordPage } from '../change-password/change-password';
import { ProfilePage } from '../profile/profile';
import { SocialPage } from '../social/social';
import { ListPage } from '../list/list';
import { SearchPage } from '../search/search';
import {AddressListPage  } from '../address-list/address-list';
import { ModalController } from 'ionic-angular';
import {ProductsPage} from '../products/products';
import { GooglePlus } from '@ionic-native/google-plus';
/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {
  avatarPath: String = DEFAULT_AVATAR;
  customerService: String = CUSTOMER_SERVICE;

  bIsMobile;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    public googlePlus: GooglePlus) {
      this.bIsMobile = !this.platform.is('mobileweb') && !this.platform.is('core');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinePage');
  }

  edit() {
    console.log("edit");
    this.navCtrl.push(ProfilePage);
  }
   addProduct() {
    console.log("edit");
    this.navCtrl.push(ProductsPage);
  }

  share() {
    this.navCtrl.push(FeedPage);
  }
  socialPage() {
    this.navCtrl.push(SocialPage);
  }

  login() {

    this.navCtrl.push(LoginPage, { page: 'login' });
  }
  signup() {

    this.navCtrl.push(LoginPage, { page: 'register' });
  }
  changePass() {
    this.navCtrl.push(ChangePasswordPage);
  }

  bindPhone() {
    this.navCtrl.push(BindPhonePage);
  }

  listPage() {
    this.navCtrl.push(ListPage);
  }

  searchPage() {
    this.navCtrl.push(SearchPage);
  }
   addressPage() {
    this.navCtrl.push(AddressListPage);
  }
  topup() {
    let topupModal = this.modalCtrl.create(TopupComponent);
    topupModal.present();
  }
  addQuantityModal() {
    let quantityModal = this.modalCtrl.create(QuantityComponent, { page: 'add' });
    quantityModal.present();
  }
  productInfoModal() {
    let quantityModal = this.modalCtrl.create(QuantityComponent, { page: 'product' });
    quantityModal.present();
  }
  otherQuantityModal() {
    let quantityModal = this.modalCtrl.create(QuantityComponent, { page: 'other' });
    quantityModal.present();
  }

  logout() {
    if(this.bIsMobile) {
      this.googlePlus.logout().then(res => {
        console.log(res);
        console.log('logout success');
      }).catch(error => {
        console.log(error);
      })
    }
    this.afAuth.auth.signOut();
    //document.dispatchEvent(new Event("userlogout"));
  }
}

