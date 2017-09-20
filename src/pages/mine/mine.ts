import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DEFAULT_AVATAR, CUSTOMER_SERVICE} from "../../providers/Constants";
import {UserInfo} from "../../models/UserInfo";
import { FeedPage } from '../feed/feed';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {
  avatarPath: String = DEFAULT_AVATAR;
  customerService: String = CUSTOMER_SERVICE;
  userInfo: UserInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinePage');
  }
  
  edit(){
		console.log("edit");
	}

  share(){
   this.navCtrl.push(FeedPage);
  }

  login(){
    
    this.navCtrl.push(LoginPage,  {page: 'login'});
  }
  signup(){
    
    this.navCtrl.push(LoginPage, {page: 'register'});
  }
}
