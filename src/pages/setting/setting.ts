import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { Api } from '../../providers/api/api';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
myData = [];
  constructor(public navCtrl: NavController, public api: Api, public navParams: NavParams, public popoverCtrl: PopoverController) {
		this.fetchDraws();
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
	} 
	fetchDraws(){
		
	this.api.getList(`/draw-history/summary`).subscribe(response =>{
		
		response.forEach(element => {

			this.api.getObject(`/products/${element.productId}`).subscribe(res =>{
				element.product = res;
				element.barValue = 70;
			});

			this.api.getObject(`/users/${element.winner}`).subscribe(res =>{
				element.winner = res;
			});

		});
 
		 console.log(response);
	 this.myData = response;
 });
	}	
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
