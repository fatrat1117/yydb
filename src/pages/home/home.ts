import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { Round } from '../../models/round';
import { RoundsService } from '../../providers/providers'
import {TableViewPage} from '../table-view/table-view';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  preparingRounds: Round[];

  constructor(public navCtrl: NavController, 
  public modalCtrl: ModalController,
  private rs: RoundsService) {
    let callback = (results => {
      this.preparingRounds = results;
      // results.forEach(r => {
      //   this.us.updateDrawsOfRound(r.id);
      // });
    })
    this.rs.getPreparingRounds(callback);
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  tablepage() {
    console.log('click');
    this.navCtrl.push(TableViewPage);
  }
  
}
