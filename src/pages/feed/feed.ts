import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {

  pageTitleKey: string = 'FEED_TITLE';
  pageTitle: string;
  constructor(public navCtrl: NavController, 
   public navParams: NavParams,
    public translate: TranslateService) {
    
  }
  
   ionViewWillEnter() {
    // Build an empty form for the template to render
    

   
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })
}
}
