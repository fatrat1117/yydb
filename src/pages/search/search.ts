import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import {ListPage} from '../list/list';

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
  cardsdata = {};

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform) {
    this.dir = platform.dir();
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

      translate.get(["RED_LABEL",
      "CARD_HEADER",
      "NEXT",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.cardsdata = {
          label: values.RED_LABEL,
          header: values.CARD_HEADER,
          next: values.NEXT
        };
      });

      this.items = [
        "Lorem Ipsum 1",
        "Lorem Ipsum 2",
        "Lorem Ipsum 3"
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
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  listpage() {
    console.log('click');
    this.navCtrl.push(ListPage);
  }

}
