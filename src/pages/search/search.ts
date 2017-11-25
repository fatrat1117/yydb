import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform, NavParams, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { RoundsService } from '../../providers/rounds/rounds';
import { Round } from '../../models/round'
import { QuantityComponent } from '../../components/quantity/quantity';
import { ListPage } from '../list/list';
import { TableViewPage } from '../table-view/table-view';
import { DrawDoneComponent } from '../../components/draw-done/draw-done';
import * as moment from 'moment/moment';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  slides: Slide[];
  items;
  lists;
  showSkip = true;
  dir: string = 'ltr';
  //cardsdata = {};
  //mobiledata;
  tabBarElement: any;
  productId;

  round: Round;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public menu: MenuController, translate: TranslateService, public platform: Platform, navParams: NavParams, public rs: RoundsService) {
    this.productId = navParams.get('productId');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.dir = platform.dir();
  }

  ionViewDidLoad() {
    // this.rs.getRoundById(this.navParams.get('id'), r => {
    //   this.round = r;
    // });
  }

  ionViewWillUnload() {
    //this.rs.selectedRound = null
  }

  // ionViewDidEnter() {
  //   // the root left menu should be disabled on the tutorial page
  //   this.menu.enable(false);
  //   this.tabBarElement.style.display = 'none';
  //   //this.getCountDown(240);
  // }

  // ionViewWillLeave() {
  //   // enable the root left menu when leaving the tutorial page
  //   this.menu.enable(true);
  //   this.tabBarElement.style.display = 'flex';
  // }

  listpage(i) {
    if (i == 1) {
      this.navCtrl.push(ListPage);
    }

  }

  showTable() {
    this.navCtrl.push(TableViewPage);
  }

 
  getMinutes(seconds: number) {
    if (seconds == null)
      return 0;
    return Math.floor(seconds / 60);
  }

  getSeconds(seconds: number) {
    if (seconds == null)
      return 0;
    return seconds % 60;
  }

  draw() {
    let drawModal = this.modalCtrl.create(QuantityComponent, { page: 'add', productId: this.productId });
    drawModal.onDidDismiss(data => {
     // console.log('onDidDismiss', data);
      let drawDone = this.modalCtrl.create(DrawDoneComponent, { drawResponse: data });
      drawDone.present();
    });
    drawModal.present();
  }
}
