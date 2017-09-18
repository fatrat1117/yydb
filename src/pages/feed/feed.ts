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
  feeds:any;
  
  constructor(public navCtrl: NavController, 
   public navParams: NavParams,
    public translate: TranslateService) {
    
  }
    
  
   ionViewWillEnter() {
    // Build an empty form for the template to render
    

   
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;
    this.feeds = 
          [
            { 
                user: 'John Doe',
                profile_img: 'person.png',
                date: '17-09-17 04:59',
                title: 'Iphone 8 launch',
                content:' iPhone 8 introduces an all‑new glass design. The world&#39;s most popular camera, now even better.',
                images: [
                    {url: 'sample1.jpg', alt: "Iphone 8 front face"},
                    {url: 'sample2.jpg', alt: "Iphone 8 back face"},
                    {url: 'sample3.jpg', alt: "Iphone 8 front & back face"},
                  
                ]
            },

            { 
                user: 'John Doe',
                profile_img: 'person.png',
                date: '17-09-17 05:59',
                    title: 'Iphone 7 launch',
                    content:'iPhone 7 Plus dramatically improves the most important aspects of the iPhone experience. It introduces advanced new camera systems.',
                    images: [
                        {url: 'iphone7-1.jpg', alt: "Iphone 7 front face"},
                        {url: 'iphone7-red.png', alt: "Iphone 7 back face"},
                        {url: 'iphone7.jpg', alt: "Iphone 7 front & back face"} 
                ]
            }

          ];
    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
     
    })
}
}
