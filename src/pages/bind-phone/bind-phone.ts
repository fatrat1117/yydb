import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ViewController, PopoverController } from 'ionic-angular';
import { SelectCountryComponent } from '../../components/select-country/select-country';
import { FirebaseApp  } from 'angularfire2';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-bind-phone',
  templateUrl: 'bind-phone.html',
})
export class BindPhonePage {
  tabBarElement: any;
  phone: { num: any, cc: any } = {
    num: '', cc: {
      "name": "China",
      "dail_code": "+86",
      "code": "CN"
    }
  };
  confirming: any;
  public recaptchaVerifier: any;
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, 
  private firebaseApp: FirebaseApp,
  public navParams: NavParams, 
  public viewCtrl: ViewController, 
  public translateService: TranslateService) {
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
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }
  selectCountry(myEvent) {
    let popover = this.popoverCtrl.create(SelectCountryComponent);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((popoverData) => {
      if (popoverData != null) this.phone.cc = popoverData;

      console.log(popoverData);
    })
  }
  confirmNumber() {
    this.confirming = true;
  }

  getCode() {
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+" + this.phone.num;
    console.log('get code, hp=', phoneNumberString);
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
      })
      .catch(function (error) {
        console.error("SMS not sent", error);
      });
  }
}
