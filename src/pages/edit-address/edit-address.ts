import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/**
 * Generated class for the AddAdressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-address',
  templateUrl: 'edit-address.html',
})
export class EditAddressPage {
  tabBarElement: any;
countries:any;
 add = {};
  constructor(public navCtrl: NavController,private http: Http,  public navParams: NavParams, public viewCtrl: ViewController, ) {
     this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      http.get('assets/co.json')
      // Call map on the response observable to get the parsed people object
      .map(res => res.json())
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      .subscribe(data =>{ 
        this.countries = data.data;
       
      });
      this.add = navParams.get('data');
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
}

