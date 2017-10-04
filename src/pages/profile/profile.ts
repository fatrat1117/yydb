import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DEFAULT_AVATAR} from "../../providers/Constants";
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  avatarPath: String = DEFAULT_AVATAR;
  info: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.info = {
      name: '张大锤',
      sex: '男',
      birthday: '1980-1-1'
    };
  }

  
  ionViewDidLoad() {
    
  }

  

}
