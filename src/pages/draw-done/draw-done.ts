import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-drawdone',
  templateUrl: 'draw-done.html'
})
export class DrawDonePage {
  drawResponse;
  constructor(public navCtrl: NavController, params: NavParams) {
    this.drawResponse = params.get('drawResponse');
  }

}
