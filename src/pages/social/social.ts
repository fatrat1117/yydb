import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the SocialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
})
export class SocialPage {
  tabBarElement: any;
  upperTab = 'tab_one';
  tabonedata;

  constructor(translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    translate.get(["SOCIAL_RATE_TEXT",
      "SOCIAL_RATE_SELECT",
      "BUTTON_RATE1",
      "BUTTON_RATE2",
      "BUTTON_RATE3",
      "BUTTON_RATE4",
      "BUTTON_RATE5",
      "BUTTON_RATE6",
      "BUTTON_RATE7",
      "BUTTON_RATE8",
      "CHECKBOX_TEXT",
      "SOCIAL_SECOND_SECTION",
      "SOCIAL_THIRD_SECTION",
      "SOCIAL_THIRD_SECTION_RATETEXT",
      "SOCIAL_THIRD_SECTION_RATE",
      "SOCIAL_THIRD_SECTION_TEXT1",
      "SOCIAL_THIRD_SECTION_TEXT2",
      "SOCIAL_PERSON1",
      "SOCIAL_PERSON1_DETAIL1",
      "SOCIAL_PERSON1_DETAIL2",
      "SOCIAL_PERSON1_DETAIL3",
      "SOCIAL_PERSON1_DETAIL4",
      "SOCIAL_PERSON2",
      "SOCIAL_PERSON2_DETAIL1",
      "SOCIAL_PERSON2_DETAIL2",
      "SOCIAL_PERSON3",
      "SOCIAL_PERSON3_DETAIL1",
      "BUTTON_TEXT1",
      "BUTTON_TEXT2",
      "BUTTON_TEXT3",
      "PROCESS1",
      "PROCESS2",
      "PROCESS3"
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.tabonedata = {
          ratetext: values.SOCIAL_RATE_TEXT,
          rate: values.SOCIAL_RATE_SELECT,
          btnrate1: values.BUTTON_RATE1,
          btnrate2: values.BUTTON_RATE2,
          btnrate3: values.BUTTON_RATE3,
          btnrate4: values.BUTTON_RATE4,
          btnrate5: values.BUTTON_RATE5,
          btnrate6: values.BUTTON_RATE6,
          btnrate7: values.BUTTON_RATE7,
          btnrate8: values.BUTTON_RATE8,
          checkboxtext: values.CHECKBOX_TEXT,
          socialsecondsection: values.SOCIAL_SECOND_SECTION,
          socialthirdsection: values.SOCIAL_THIRD_SECTION,
          socialthirdsectionratetext: values.SOCIAL_THIRD_SECTION_RATETEXT,
          socialthirdsectionrate: values.SOCIAL_THIRD_SECTION_RATE,
          socialthirdsectiontext1: values.SOCIAL_THIRD_SECTION_TEXT1,
          socialthirdsectiontext2: values.SOCIAL_THIRD_SECTION_TEXT2,
          socialperson1: values.SOCIAL_PERSON1,
          socialperson1detail1: values.SOCIAL_PERSON1_DETAIL1,
          socialperson1detail2: values.SOCIAL_PERSON1_DETAIL2,
          socialperson1detail3: values.SOCIAL_PERSON1_DETAIL3,
          socialperson1detail4: values.SOCIAL_PERSON1_DETAIL4,
          socialperson2: values.SOCIAL_PERSON2,
          socialperson2detail1: values.SOCIAL_PERSON2_DETAIL1,
          socialperson2detail2: values.SOCIAL_PERSON2_DETAIL2,
          socialperson3: values.SOCIAL_PERSON3,
          socialperson3detail1: values.SOCIAL_PERSON3_DETAIL1,
          buttontext1: values.BUTTON_TEXT1,
          buttontext2: values.BUTTON_TEXT2,
          buttontext3: values.BUTTON_TEXT3,
          process1: values.PROCESS1,
          process2: values.PROCESS2,
          process3: values.PROCESS3
        };
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialPage');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

}
