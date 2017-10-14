import { Injectable } from '@angular/core';
import { Subscription } from "rxjs/Rx"
import { FirebaseListObservable } from 'angularfire2/database';

import { Api } from '../api/api';
import { Product } from '../../models/product';
import { ProductsService } from '../products/products';
import { Round } from '../../models/round';
import { UserService } from '../user/user';


@Injectable()
export class RoundsService {
  preparingRounds: Round[];
  processingRounds: Round[];

  selectedRound: Round;
  selectedRoundSubs: Subscription;
  constructor(public api: Api, public ps: ProductsService, public us: UserService) {
  }

  getRoundById(id: string, success_Callback) {
    if (this.selectedRound && this.selectedRound.id == id) {
      success_Callback(this.selectedRound);
      return
    }

    if (this.selectedRoundSubs) {
      this.selectedRoundSubs.unsubscribe();
    }

    this.selectedRoundSubs = this.api.getObject(`/rounds/${id}`).subscribe(r => {
      let callback = (p => {
        this.api.log("Get Round By Id: " + id, p);
        this.selectedRound = this.createNewRound(r, p);
        success_Callback(this.selectedRound);
      })

      this.ps.getProductById(r.product_id, callback);
    })
  }

  // rounds will be updated in real time
  getPreparingRounds() {
    if (this.preparingRounds != undefined) {
      this.api.fireCustomEvent("PreparingRoundsReady", this.preparingRounds);
    }
    else {
      // 1st time call
      this.preparingRounds = [];
      this.getRounds_Internal('preparing');
    }
  }

  getProcessingRounds() {
    if (this.processingRounds != undefined) {
      this.api.fireCustomEvent("ProcessingRoundsReady", this.processingRounds);
    }
    else {
      // 1st time call
      this.processingRounds = [];
      this.getRounds_Internal('processing');
    }
  }

  getRounds_Internal(status: string) {
    const query = {
      query: {
        orderByChild: 'status',
        equalTo: status
      }
    };

    this.api.getList('/rounds', query).subscribe(snapshots => {
      if (snapshots.length == 0) {
        this.fireReadyEvent(status, []);
        return;
      }

      let roundsRef = [];
      // Iterate rounds to get product
      snapshots.forEach(r => {
        let callback = (p => {
          roundsRef.push(this.createNewRound(r, p));
          if (roundsRef.length == snapshots.length) {
            this.fireReadyEvent(status, roundsRef);
          }
        })
        this.ps.getProductById(r.product_id, callback);
      })
    })
  }

  fireReadyEvent(status: string, roundsRef: Round[]) {
    if (status == 'preparing') {
      this.preparingRounds = roundsRef;
      this.api.log("get preparing rounds", this.preparingRounds);
      this.api.fireCustomEvent("PreparingRoundsReady", this.preparingRounds);
    } else if (status == 'processing') {
      this.processingRounds = roundsRef;
      this.api.log("get processing rounds", this.processingRounds);
      this.api.fireCustomEvent("ProcessingRoundsReady", this.processingRounds);
    }
  }

  createNewRound(round: any, product: Product) {
    let r = new Round(round.$key, product, round.draw_price, round.status);
    if (round.draw_counts != undefined) {
      r.drawCounts.current = round.draw_counts.current || 0;
      r.drawCounts.target = round.draw_counts.target || 0;
    }

    if (round.result_time != undefined) {
      r.setResultTime(round.result_time, round.result);
    }
    return r;
  }

  addDraws(roundId: string, want: number, callback) {
    let endpoint = `/rounds-draws/${roundId}/waiting-list`;
    let draws = {};
    this.api.getList(endpoint).push({
      want: want
    }).then(snapshot => {
      let subs = this.api.getObject(`${endpoint}/${snapshot.key}/deal`).subscribe(s => {
        let deal = s.$value;
        if (deal != null) {
          subs.unsubscribe();
          callback(deal);
          this.us.updateDrawsOfRound(roundId, deal);
        }
      })
    })
  }


  /** Test only APIs */
  restartCountDown(round: Round) {
    let draws = this.api.getObject(`/rounds/${round.id}/draw_counts`);
    draws.update({
      current: 0
    })

    draws.update({
      current: round.drawCounts.target
    })
  }
}
