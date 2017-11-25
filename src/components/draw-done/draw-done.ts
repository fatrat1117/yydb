import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';	

/**
 * Generated class for the DrawDoneComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'draw-done',
  templateUrl: 'draw-done.html'
})
export class DrawDoneComponent {

  drawResponse;
  drawData;
  numbersStr;
  constructor(public navCtrl: NavController, 
  params: NavParams,
  private viewCtrl: ViewController) {
    this.drawResponse = params.get('drawResponse');
    //console.log('DrawDonePage', this.drawResponse);
    this.drawData = JSON.parse(this.drawResponse._body);
    console.log('DrawDonePage data', this.drawData.numbers);
    this.numbersStr = this.drawData.numbers.toString();
  }

  onParticipateAgain() {
    this.viewCtrl.dismiss();
  }

  onBackHome() {

  }

}
