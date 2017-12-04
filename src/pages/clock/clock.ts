import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

    this.rs.getDrawListFromDB(4, ()=>{
      this.numOfTeams += 4;
    });
    
  }

  getMoreDraws(infiniteScroll) {
    this.rs.getDrawListFromDB(this.numOfTeams + 4, ()=>{
      this.numOfTeams += 4;
      infiniteScroll.complete();
    })
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
  
  navToItemDetail() {
    this.navCtrl.push(SearchPage);
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
