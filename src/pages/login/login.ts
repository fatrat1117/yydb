import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController,  NavParams, ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../providers/providers';
import { MainPage } from '../pages';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

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
  tabBarElement:any;
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;
  user;
  
  constructor(public navCtrl: NavController,
    public userService: UserService,
    public toastCtrl: ToastController,
    public translateService: TranslateService , 
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth
    ) {
      this.user = afAuth.authState;
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
       this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      this.cat = navParams.get("page");
  }

  // Attempt to login in through our User service
  doLogin() {
    /*
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    */
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
  
    forgotPassword(){
      this.navCtrl.push(ForgotPasswordPage);
    }

    signinWithGoogle() {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
}
