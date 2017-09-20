import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the TableViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-table-view',
  templateUrl: 'table-view.html',
})
export class TableViewPage {

  tabledata = {};
  multidata = {};
  tabBarElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, translate: TranslateService) {
  this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  translate.get(["TABLE_CONTENT1",
      "TABLE_CONTENT2",
      "TABLE_CONTENT3",
      "TABLE_CONTENT4",
      "TABLE_CONTENT5",
      "TABLE_CONTENT6",
      "TABLE_CONTENT7",
      "TABLE_CONTENT8",
      "TABLE_CONTENT9",
      "TABLE_CONTENT10",
      "TABLE_CONTENT11",
      "TABLE_CONTENT12",
      "TABLE_CONTENT13",
      "TABLE_CONTENT14",
      "TABLE_CONTENT15",
      "TABLE_CONTENT16",
      "TABLE_CONTENT17",
      "TABLE_CONTENT18",
      "TABLE_CONTENT19",
      "TABLE_CONTENT20",
      "TABLE_CONTENT21",
      "TABLE_CONTENT22",
      "TABLE_CONTENT23",
      "TABLE_CONTENT24",
      "TABLE_CONTENT25",
      "TABLE_CONTENT26",
      "TABLE_CONTENT27",
      "TABLE_CONTENT28"
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.tabledata = [
          {
          table_content1: values.TABLE_CONTENT1,
          table_content2: values.TABLE_CONTENT2,
          table_content3: values.TABLE_CONTENT3,
          table_content4: values.TABLE_CONTENT4
        },
        {
          table_content1: values.TABLE_CONTENT5,
          table_content2: values.TABLE_CONTENT6,
          table_content3: values.TABLE_CONTENT7,
          table_content4: values.TABLE_CONTENT8
        },
        {
          table_content1: values.TABLE_CONTENT9,
          table_content2: values.TABLE_CONTENT10,
          table_content3: values.TABLE_CONTENT11,
          table_content4: values.TABLE_CONTENT12
        },
        {
          table_content1: values.TABLE_CONTENT13,
          table_content2: values.TABLE_CONTENT14,
          table_content3: values.TABLE_CONTENT15,
          table_content4: values.TABLE_CONTENT16
        },
        {
          table_content1: values.TABLE_CONTENT17,
          table_content2: values.TABLE_CONTENT18,
          table_content3: values.TABLE_CONTENT19,
          table_content4: values.TABLE_CONTENT20
        },
        {
          table_content1: values.TABLE_CONTENT21,
          table_content2: values.TABLE_CONTENT22,
          table_content3: values.TABLE_CONTENT23,
          table_content4: values.TABLE_CONTENT24
        },
        {
          table_content1: values.TABLE_CONTENT25,
          table_content2: values.TABLE_CONTENT26,
          table_content3: values.TABLE_CONTENT27,
          table_content4: values.TABLE_CONTENT28
        }
        ];
      });

      translate.get(["VALUE1",
      "VALUE2",
      "VALUE3",
      "VALUE4",
      "TEXT1",
      "TEXT2",
      "TEXT3",
      "TEXT4",
      "REDBOXLABEL"
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.multidata = {
          value1: values.VALUE1,
          value2: values.VALUE2,
          value3: values.VALUE3,
          value4: values.VALUE4,
          text1: values.TEXT1,
          text2: values.TEXT2,
          text3: values.TEXT3,
          text4: values.TEXT4,
          boxdata: values.REDBOXLABEL
        };
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TableViewPage');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

}
