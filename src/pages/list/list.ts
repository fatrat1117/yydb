import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  tabBarElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  lists =  [
    {
      left:"20170816",
      right:"2017-09-16 14:24",
      name:"Asthew",
      cpid:"123456",
      phone:"1001001011",
      code:"44D"
    },
    {
      left:"20170816",
      right:"2017-09-16 14:24",
      name:"Asthew Mark",
      cpid:"123456",
      phone:"1001001011",
      code:"44D"
    },
    {
      left:"20170816",
      right:"2017-09-16 14:24",
      name:"Asthew Mark",
      cpid:"123456",
      phone:"1001001011",
      code:"44D"
    },
    {
      left:"20170816",
      right:"2017-09-16 14:24",
      name:"Asthew Mark",
      cpid:"123456",
      phone:"1001001011",
      code:"44D"
    }
  ];

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
 
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

}
