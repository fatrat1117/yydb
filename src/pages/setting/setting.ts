import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
	this.myData = [{
		image: 'assets/img/jd.jpg',
		title: 'Museum of Football',
		id: '220000322212222',
		price: '60',
		firstValue: '600',
		endValue: '100',
		barValue: '70',
		logo:''
	},
	{
		image: 'assets/img/jd.jpg',
		title: 'Museum of Cricket',
		id: '320000322212222',
		price: '60',
		firstValue: '600',
		endValue: '100',
		barValue: '',
		logo:''
	},
	{
		image: 'assets/img/jd.jpg',
		title: 'Museum of Football',
		id: '420000322212222',
		price: '60',
		firstValue: '600',
		endValue: '100',
		barValue: '',
		logo:'assets/img/stamp.png'
	},
	{
		image: 'assets/img/jd.jpg',
		title: 'Museum of Cricket',
		id: '320000322212222',
		price: '60',
		firstValue: '600',
		endValue: '100',
		barValue: '',
		logo:''
	}]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
