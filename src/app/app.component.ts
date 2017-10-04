import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/pages';
import { Settings } from '../providers/providers';
import { App, ModalController } from 'ionic-angular';

@Component({
  template: `<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any = MainPage;
  loginModal;
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    //{ title: 'Tutorial', component: 'TutorialPage' },
    //{ title: 'Welcome', component: 'WelcomePage' },
    { title: 'Tabs', component: 'TabsPage' },
    { title: 'Login', component: 'LoginPage' },
    { title: 'Signup', component: 'SignupPage' },
    { title: 'Home', component: 'HomePage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' },
    { title: 'API Tests', component: 'ApiTestsPage' }
  ]

  constructor(private translate: TranslateService,
    private platform: Platform,
    settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private afAuth: AngularFireAuth,
    private app: App,
    public popoverCtrl: ModalController) {
    this.initTranslate();

    afAuth.authState.subscribe(user => {
      if (user) {
        //console.log('go tabs page');
        //this.app.getRootNavs()[0].setRoot(MainPage);
        //this.rootPage = MainPage;
        //this.loginModal.dis
      }
      else {
        console.log('go login page');
        this.loginModal = this.popoverCtrl.create(LoginPage);
        this.loginModal.present();
        //this.app.getRootNavs()[0].setRoot(LoginPage);
        //this.rootPage = LoginPage;
      }
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    // Set lang for testing here
    this.translate.use('zh');

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log('openpage', page);
    this.nav.setRoot(page.component);
  }
}
