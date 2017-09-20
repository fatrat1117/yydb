import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ProductsService } from '../providers/providers';
import { RoundsService } from '../providers/providers';
import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { FeedPage } from '../pages/feed/feed';
import { SingleproductPage } from '../pages/singleproduct/singleproduct';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { WelcomePage } from '../pages/welcome/welcome';
import { ConfirmPage } from '../pages/confirm/confirm';
import { SettingPage } from '../pages/setting/setting';
import { NewhomePage } from '../pages/newhome/newhome';
import { NewminePage } from '../pages/newmine/newmine';
import { ClockPage } from '../pages/clock/clock';
import { ProcessPage } from '../pages/process/process';

// Firebase config
export const firebaseConfig = {
  apiKey: "AIzaSyD34vLme2YuR_PthmykCCoUd2oIcUtHBoM",
  authDomain: "yydb-9a6c4.firebaseapp.com",
  databaseURL: "https://yydb-9a6c4.firebaseio.com",
  projectId: "yydb-9a6c4",
  storageBucket: "yydb-9a6c4.appspot.com",
  messagingSenderId: "496534747409"
};


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
     FeedPage,
     WelcomePage,
     ConfirmPage,
	 SingleproductPage,
	 SettingPage,
	 NewhomePage,
	 ClockPage,
	 ProcessPage,
	 NewminePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
     FeedPage,
     WelcomePage,
     ConfirmPage,
	 SingleproductPage,
	 SettingPage,
	 NewminePage,
	 ClockPage,
	 ProcessPage,
	 NewhomePage
  ],
  providers: [
    Api,
    ProductsService,
    RoundsService,
    Items,
    User,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
})
export class AppModule { }
