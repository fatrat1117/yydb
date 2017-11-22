import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { ViewController, PopoverController } from 'ionic-angular';
import { SelectCountryComponent } from '../../components/select-country/select-country';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../providers/providers';
import { MainPage } from '../pages';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { Facebook, Google } from 'ng2-cordova-oauth/core';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova'
import {Settings} from '../../providers/settings/settings'
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  phone: { num: any, cc: any, authCode: string} = {
    num: '', cc: {
      "name": "China",
      "dail_code": "+86",
      "code": "CN",
    },
    authCode: ''
  };


  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  cat: string = "login";
  tabBarElement: any;
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  signupAccount: { phone: any, password: string } = {
    phone: {
      num: '', cc: {
        "name": "China",
        "dail_code": "+86",
        "code": "CN",
      },
      authCode: ''
    },
    password: ''
  };

  signinAccount: { phone: any, password: string } = {
    phone: {
      num: '', cc: {
        "name": "China",
        "dail_code": "+86",
        "code": "CN",
      },
      authCode: ''
    },
    password: ''
  };

  private facebookProvider = new Facebook({
        clientId: "1729159120442368",
        appScope: ["email"]
    });

  private googleProvider = new Google({
    //apiUrl: 'https://www.googleapis.com/oauth2/v3/',
    clientId: "496534747409-u5mivriodaqbrgt7v92ivbqcfunhakkf.apps.googleusercontent.com",
    appScope: ["email"]
  });  

  private cordovaOauth: OauthCordova = new OauthCordova();
  busy = false;
  private loginErrorString: string;
  bIsMobile;
  public confirming: any;
  public recaptchaVerifier: any;
  public confirmationResult: any;

  constructor(public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public userService: UserService,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private platform: Platform,
    private settings: Settings,
    private storage: Storage
  ) {
    this.bIsMobile = !this.platform.is('mobileweb') && !this.platform.is('core');

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.cat = navParams.get("page");
    if (!this.cat)
      this.cat = 'login';
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

  // Attempt to login in through our User service
  // ionViewWillEnter() {
  //   this.tabBarElement.style.display = 'none';
  // }

  // ionViewWillLeave() {
  //   this.tabBarElement.style.display = 'flex';
  // }
  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
    
  }


  autoLogin() {
    this.storage.get('phone_credential').then((val) => {
      if(val) {
        const credential:firebase.auth.AuthCredential = val;
        console.log(credential);
        this.afAuth.auth.signInWithCredential(credential)
        .then(result => {
          this.dismiss();
          return true;
        })
        .catch(function (error) {
          // console.log(error.credential);
          this.storage.set('phone_credential', null);
          
        });
      }
    });

    return false;
  }

  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  signinWithGoogle() {
    if (this.bIsMobile) {
      // this.cordovaOauth.logInVia(this.googleProvider).then(g => {
      //   console.log("google success: ", g);
      // });
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

    doLogin() {
      const phoneNum: string = this.signinAccount.phone.num;
      const password: string = this.signinAccount.password;
      if(phoneNum && password) {
        let email = phoneNum + '@1k.com';
        firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
          console.log('login successful');
          this.dismiss();
        }).catch(err => {
          let toast = this.toastCtrl.create({
            message: err.message,
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          console.log(err);
        })
      }
    }

    confirmNumber() {
      // this.confirming = true;
    }
  
    getCode() {
      if(this.signupAccount.phone.num) {
        this.confirmationResult = '';
        const appVerifier = this.recaptchaVerifier;
        console.log('dail_code=', this.signupAccount.phone.cc.dail_code);
        const phoneNumberString = this.signupAccount.phone.cc.dail_code + this.signupAccount.phone.num;
        console.log('get code, hp=', phoneNumberString);
        firebase.auth().signInWithPhoneNumber(phoneNumberString, new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible'
        }))
          .then(confirmationResult => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            this.confirming = true;
            this.confirmationResult = confirmationResult;
            
          })
          .catch(function (error) {
            console.error("SMS not sent", error);
          });

        // this.confirming = true;

      }
      
    }

    verifyCode() {
      let code: string = this.signupAccount.phone.authCode;
      const password: string = this.signupAccount.password;
      // const phoneNum: string = this.signupAccount.phone.num;
      const phoneNum = this.signupAccount.phone.cc.dail_code + this.signupAccount.phone.num;
      if(code && password) {
        const phoneCredential:firebase.auth.AuthCredential = firebase.auth.PhoneAuthProvider.credential(this.confirmationResult.verificationId, code);
        const email = phoneNum.substring(1) + '@1k.com';
        firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
          const currentUser = firebase.auth().currentUser;
          
          if(currentUser) {
            console.log('creat user account successful!');
            currentUser.linkWithCredential(phoneCredential).then(res => {
              this.dismiss();
              console.log('link successful: ' + JSON.stringify(res));
            }).catch(err => {
              console.log(err)
              console.log('bind phone error then delete the email account');
              currentUser.delete().then(res=> {
                console.log('delete the email account');
              }).catch(err => {
                console.log('delete the email account error');
                console.log(err);
              })
            })
          }
        }).catch(err => {
          console.log(err)
        });
        
        // firebase.auth().signInWithCredential(phoneCredential).then(result => {
        //   // User signed in successfully.
        //   //var user = result.user;
        //   // ...
          
        //   console.log('login successful')

          
          
        // }).catch(function (error) {
        //   // User couldn't sign in (bad verification code?)
        //   // ...
        //   console.log(error);
        // });
        
        // this.confirmationResult.confirm(code).then(result => {
        //   // User signed in successfully.
        //   //var user = result.user;
        //   // ...
          
        //   this.dismiss();
        // }).catch(function (error) {
        //   // User couldn't sign in (bad verification code?)
        //   // ...
        //   console.log(error);
        // });

        console.log('phone:' + phoneNum + ' password: ' + password + ' authcode: ' + code);
      }


      
    }
}
