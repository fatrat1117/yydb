import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { Round } from '../../models/round';
import { RoundsService } from '../../providers/providers'
import { TableViewPage } from '../table-view/table-view';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  preparingRounds: Round[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public rs: RoundsService) {
      this.onPreparingRoundsReady = this.onPreparingRoundsReady.bind(this);
  }

  ionViewDidLoad() {
    // always call this 1st!
    this.addEventListeners();
    this.rs.getPreparingRounds();
  }

  ionViewWillUnload() {
    this.removeEventListeners();
  }

  addEventListeners() {
    //console.log('MePage Loaded');
    document.addEventListener('PreparingRoundsReady', this.onPreparingRoundsReady);
  }

  removeEventListeners() {
    document.removeEventListener('PreparingRoundsReady', this.onPreparingRoundsReady);
  }

  onPreparingRoundsReady(data: Event) {
    this.preparingRounds = data['detail'];
  }

  tablepage() {
    console.log('click');
    this.navCtrl.push(TableViewPage);
  }

}
