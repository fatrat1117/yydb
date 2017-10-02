import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../providers/providers';
import { MainPage } from '../pages';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { Facebook } from 'ng2-cordova-oauth/core';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova'
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  cat: string = "login";
  tabBarElement: any;
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  private facebookProvider = new Facebook({
        clientId: "1729159120442368",
        appScope: ["email"]
    });
  private cordovaOauth: OauthCordova = new OauthCordova();
  busy = false;
  private loginErrorString: string;
  bIsMobile;

  constructor(public navCtrl: NavController,
    public userService: UserService,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private platform: Platform,
  ) {
    this.bIsMobile = !this.platform.is('mobileweb') && !this.platform.is('core');

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.cat = navParams.get("page");
  }

  // Attempt to login in through our User service
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
  }

  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  signinWithGoogle() {
    if (this.bIsMobile) {
    } else
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(()=> {this.dismiss()});
  }

  signinWithFacebook(ev) {
        ev.preventDefault();
        let self = this;

        this.busy = true;

        if (this.bIsMobile) {
        this.cordovaOauth.logInVia(this.facebookProvider).then(fb => {
            console.log("Facebook success: " + JSON.stringify(fb));
            try {
                let token = fb["access_token"];
                console.log(token, firebase);
                const facebookCredential = firebase.auth.FacebookAuthProvider.credential(token);
                firebase.auth().signInWithCredential(facebookCredential).then((value) => {
                    console.log('firebase facebook success');
                    this.dismiss();
                }).catch((error) => {
                    alert(error);
                    self.busy = false;
                });
            } catch (e) {
                alert(e);
            }
        }).catch((error) => {
            alert(error);
            self.busy = false;
        });
      } else 
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(()=> {this.dismiss()});
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
