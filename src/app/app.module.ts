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
import { Settingtab1Page } from '../pages/settingtab1/settingtab1';
import { ProductsService } from '../providers/providers';
import { RoundsService } from '../providers/providers';
import { Settings } from '../providers/providers';
import { UserService } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { FeedPage } from '../pages/feed/feed';
import { LoginPage } from '../pages/login/login';
import { BindPhonePage } from '../pages/bind-phone/bind-phone';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ListPage } from '../pages/list/list';
import { TableViewPage } from '../pages/table-view/table-view';
import { ProfilePage } from '../pages/profile/profile';
import { SearchPage } from '../pages/search/search';
import { SocialPage } from '../pages/social/social';
import { SettingPage } from '../pages/setting/setting';
import { AddressListPage } from '../pages/address-list/address-list';
import { AddAdressPage } from '../pages/add-adress/add-adress';
import { EditAddressPage } from '../pages/edit-address/edit-address';

import { ProductsPage } from '../pages/products/products';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SelectCountryComponent } from '../components/select-country/select-country';
import { QuantityComponent } from '../components/quantity/quantity';
import { TopupComponent } from '../components/topup/topup';
import { ProductCrudComponent } from '../components/product-crud/product-crud';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer';

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
    ListPage,
    TableViewPage,
    ProfilePage,
    LoginPage,
    SearchPage,
    SocialPage,
    SettingPage,
    BindPhonePage,
    ChangePasswordPage,
    ForgotPasswordPage,
    SelectCountryComponent,
    QuantityComponent,
    TopupComponent,
    ProductCrudComponent,
    AddressListPage,
    EditAddressPage,
    AddAdressPage,
    Settingtab1Page,
    
    ProductsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    IonicStorageModule.forRoot(),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedPage,
    LoginPage,
    BindPhonePage,
    ChangePasswordPage,
    ForgotPasswordPage,
    SettingPage,
    SelectCountryComponent,
    QuantityComponent,
    ProductCrudComponent,    
    Settingtab1Page,
    ListPage,
    TableViewPage,
    ProfilePage,
    LoginPage,
    SearchPage,
    SocialPage,
    AddressListPage,
    AddAdressPage,
    EditAddressPage,
    TopupComponent,
    
    ProductsPage
    
  ],
  providers: [
    ProductsService,
    Api,
    RoundsService,
    UserService,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    InAppBrowser,
    PhotoViewer,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
})
export class AppModule { }
