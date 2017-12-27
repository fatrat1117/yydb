import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
import { SearchPage } from '../search/search'
import { RoundsService } from '../../providers/providers'
import { Round } from '../../models/round';
import { Draw } from '../../models/draw';

/**
 * Generated class for the ClockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clock',
  templateUrl: 'clock.html',
})
export class ClockPage {
  ITEM_COUNT: number = 10;
  processingRounds: Round[];
  draws: Draw[];
  numOfTeams: number = 0;
  constructor(public navCtrl: NavController, private rs: RoundsService, public navParams: NavParams) {
    this.onProcessingRoundsReady = this.onProcessingRoundsReady.bind(this);
    
    this.rs.getProcessingRounds();
    this.draws = this.rs.getHistoryDraws();
    
  }

  ionViewDidLoad() {
    this.addEventListeners();

    this.rs.getDrawListFromDB(this.ITEM_COUNT, (success, result)=>{
      if(success) {
        this.numOfTeams += this.ITEM_COUNT;
      }
      
    }, true);
    
  }

  getMoreDraws(infiniteScroll) {
    this.rs.getDrawListFromDB(this.numOfTeams + this.ITEM_COUNT, (success, result)=>{
      if(success) {
        this.numOfTeams += this.ITEM_COUNT;
      }
      infiniteScroll.complete();
    }, false)
  }


  doRefresh(refresher: Refresher) {
    console.log('DOREFRESH', refresher);
    this.numOfTeams = 0;
    this.rs.getDrawListFromDB(this.ITEM_COUNT, (success, result)=>{
      if(success) {
        this.numOfTeams += this.ITEM_COUNT;
      }
      refresher.complete();
    }, true);
  }

  doPulling(refresher: Refresher) {
    console.log('DOPULLING', refresher.progress);
  }

  addEventListeners() {
    //console.log('MePage Loaded');
  
    document.addEventListener('ProcessingRoundsReady', this.onProcessingRoundsReady);
  }

  removeEventListeners() {
   
    document.addEventListener('ProcessingRoundsReady', this.onProcessingRoundsReady);
  }
  onProcessingRoundsReady(data: Event) {
    this.processingRounds = data['detail'];
  }
  
  navToItemDetail(draw) {
    this.navCtrl.push(SearchPage, {draw: draw});
  }
  getMinutes(seconds: number) {
    if (seconds == null)
      return 0;
 var m =  Math.floor(seconds / 60);
 if (m == 0) return '00';
 return m;
  }

  getSeconds(seconds: number) {
    if (seconds == null)
      return 0;
    var s =  seconds % 60;
    if (s == 0) return '00';
    return s;
  }
  toDate(ts){
    return new Date(ts*1000).toLocaleString();
  }

}
