import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController,  NavParams, ToastController } from 'ionic-angular';
import { ViewController, PopoverController } from 'ionic-angular';
import { SelectCountryComponent } from '../../components/select-country/select-country';

/**
 * Generated class for the BindPhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bind-phone',
  templateUrl: 'bind-phone.html',
})
export class BindPhonePage {
 tabBarElement: any;
 phone: {num:any, cc:any}={num:'', cc:{
        "name": "China",
        "dail_code": "+86",
        "code": "CN"
    }};
      confirming:any;
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
    selectCountry(myEvent) {
        let popover = this.popoverCtrl.create(SelectCountryComponent);
        popover.present({
          ev: myEvent
        });
          popover.onDidDismiss((popoverData) => {
            if (popoverData != null)   this.phone.cc = popoverData;

      console.log(popoverData);
    })
  }
  confirmNumber(){
    this.confirming = true;
  }
     
}
