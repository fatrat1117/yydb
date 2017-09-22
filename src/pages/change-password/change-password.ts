import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController,  NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
/**
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
 tabBarElement: any;
 reset:boolean;
 password:{ old: string, new: string, confirm:string }= {
    old: '',
    new: '',
    confirm: '',
    
  }; ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public translateService: TranslateService ) {
         this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
 this.reset = navParams.get("reset");
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
