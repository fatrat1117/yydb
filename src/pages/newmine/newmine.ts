import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DEFAULT_AVATAR, CUSTOMER_SERVICE} from "../../providers/Constants";
import {UserInfo} from "../../models/UserInfo";
import { FeedPage } from '../feed/feed';

/**
 * Generated class for the NewminePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newmine',
  templateUrl: 'newmine.html',
})
export class NewminePage {
  avatarPath: String = DEFAULT_AVATAR;
  customerService: String = CUSTOMER_SERVICE;
  userInfo: UserInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewminePage');
  }
  
  edit(){
		console.log("edit");
	}

  share(){
   this.navCtrl.push(FeedPage);
  }

}
