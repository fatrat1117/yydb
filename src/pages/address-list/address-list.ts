import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import {AddAdressPage} from '../add-adress/add-adress';
import {EditAddressPage} from '../edit-address/edit-address';
/**
 * Generated class for the AddressListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-list',
  templateUrl: 'address-list.html',
})
export class AddressListPage {
  tabBarElement: any;
addresses:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, ) {
   this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

   ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';

  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
          this.addresses= [
        { 
        street:"5006 Ang Mo Kio Ave 5 #05-01/12 TECHplace II", city:"Jurong east", state:"Singapore", country:"Singapore"},
        {street:"85 Kwame Nkurumah crescent", city:"Asokoro", state:"Abuja", country:"Nigeria"}
      ];
      console.log(this.addresses);
  }
    newAddresss(){
      this.navCtrl.push(AddAdressPage);
    }
    editAddress(data){
      this.navCtrl.push(EditAddressPage, {data: data});
    }
    deleteAddress(data){
     
        var index = this.addresses.indexOf(data);
        this.addresses.splice(index, 1);
      
    
    }
}
