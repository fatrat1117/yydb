import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController,  NavParams, ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
/**
/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
 tabBarElement: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public translateService: TranslateService ) {
         this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

  
 ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
   ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('');
    }

}
