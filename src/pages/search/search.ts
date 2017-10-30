import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { RoundsService } from '../../providers/rounds/rounds';
import { Round } from '../../models/round'

import { ListPage } from '../list/list';
import { TableViewPage } from '../table-view/table-view';
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
 

  round: Round;

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform, public navParams: NavParams, public rs: RoundsService) {


    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.dir = platform.dir();
    /*
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.slides = [
          {
            title: values.TUTORIAL_SLIDE1_TITLE,
            description: values.TUTORIAL_SLIDE1_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-4.png',
          },
          {
            title: values.TUTORIAL_SLIDE2_TITLE,
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-4.png',
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-4.png',
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-4.png',
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-4.png',
          }
        ];
      });

    translate.get(["MOBILE_NAME",
      "MOBILE_MODEL_NO",
      "MOBILE_PRICE",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.mobiledata = {
          mobilename: values.MOBILE_NAME,
          mobilemodalnumber: values.MOBILE_MODEL_NO,
          mobileprice: values.MOBILE_PRICE
        };
      });



    this.items = [
      "图文详情",
      "往期揭晓",
      "晒单分享"
    ]

    this.lists = [{
      "imageSrc": "assets/img/marty-avatar.png",
      "content1": "Discount",
      "date": "2017-08-19 14:07:12",
      "dis": "20%",
      "off": "off",
      "ip": "Your IP: 100.82.199.127"
    },
    {
      "imageSrc": "assets/img/marty-avatar.png",
      "content1": "Discount",
      "date": "2017-08-19 14:07:12",
      "dis": "20%",
      "off": "off",
      "ip": "Your IP: 100.82.199.127"
    },
    {
      "imageSrc": "assets/img/marty-avatar.png",
      "content1": "Discount",
      "date": "2017-08-19 14:07:12",
      "dis": "20%",
      "off": "off",
      "ip": "Your IP: 100.82.199.127"
    },
    {
      "imageSrc": "assets/img/marty-avatar.png",
      "content1": "Discount",
      "date": "2017-08-19 14:07:12",
      "dis": "20%",
      "off": "off",
      "ip": "Your IP: 100.82.199.127"
    }
    ]
    */
  }

  /*
  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }
  */

  ionViewDidLoad() {
    this.rs.getRoundById(this.navParams.get('id'), r => {
      this.round = r;
    });
  }

  ionViewWillUnload() {
    this.rs.selectedRound = null
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
    this.tabBarElement.style.display = 'none';
    //this.getCountDown(240);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
    this.tabBarElement.style.display = 'flex';
  }

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
    
  }
}
