import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController,  NavParams, ToastController } from 'ionic-angular';
import { ViewController, PopoverController } from 'ionic-angular';
import { SelectCountryComponent } from '../../components/select-country/select-country';
import { ChangePasswordPage } from '../change-password/change-password';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
 tabBarElement: any;
confirming:any;
   fp: {email:any, code:any}={email:'', code:''};
    constructor( public navCtrl: NavController, public popoverCtrl: PopoverController, public navParams: NavParams, public viewCtrl: ViewController, public translateService: TranslateService ) {

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
      resetPassword(){
    this.confirming = true;
  }
  enterCode(){
   this.navCtrl.push(ChangePasswordPage, {
     reset: true
   });
  }
}
