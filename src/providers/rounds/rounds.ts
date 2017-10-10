import { Injectable } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { Api } from '../api/api';
import { Product } from '../../models/product';
import { ProductsService } from '../products/products';
import { Round, RoundCallback } from '../../models/round';
import { UserService } from '../user/user';


@Injectable()
export class RoundsService {
  preparingRounds: Round[];
  successCallbacks: RoundCallback[];

  constructor(public api: Api, public ps: ProductsService, public us: UserService) {
    this.successCallbacks = [];
  }

  // rounds will be updated in real time
  getPreparingRounds(success_callback: RoundCallback) {
    this.getPreparingRounds_Internal(success_callback);
    /*
    const query = {
      query: {
        orderByChild: 'status',
        equalTo: 'preparing'
      }
    };

    this.api.getList('/rounds', query).subscribe(snapshots => {
      this.preparingRounds = [];

      // Iterate rounds to get product
      snapshots.forEach(r => {
        let callback = (p => {
          this.preparingRounds.push(this.createNewRound(r, p));
          if (this.preparingRounds.length == snapshots.length) {
            this.api.log("get preparing rounds", this.preparingRounds);
            success_callback(this.preparingRounds);
          }
        })
        this.ps.getProductById(r.product_id, callback);
      })
    })
    */
  }

  createNewRound(round: any, product: Product) {
    let r = new Round(round.$key, product, round.draw_price);
    if (round.draw_counts != undefined) {
      r.drawCounts.current = round.draw_counts.current || 0;
      r.drawCounts.target = round.draw_counts.target || 0;
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

  getPreparingRounds_Internal(success_callback: RoundCallback) {
    this.successCallbacks.push(success_callback);
    if (this.preparingRounds != undefined && success_callback.bIsActive) {
      success_callback.callback(this.preparingRounds);
      return;
    }

    // First time to subscribe
    const query = {
      query: {
        orderByChild: 'status',
        equalTo: 'preparing'
      }
    };

    this.api.getList('/rounds', query).subscribe(snapshots => {
      this.preparingRounds = [];

      // Iterate rounds to get product
      snapshots.forEach(r => {
        let callback = (p => {
          this.preparingRounds.push(this.createNewRound(r, p));
          if (this.preparingRounds.length == snapshots.length) {
            this.api.log("get preparing rounds", this.preparingRounds);
            //success_callback(this.preparingRounds);
            this.triggerAllSuccessCallbacks();
          }
        })
        this.ps.getProductById(r.product_id, callback);
      })
    })
  }

  triggerAllSuccessCallbacks() {
    let temp = [];

    this.successCallbacks.forEach(c => {
      console.log(c.bIsActive);
      if (c.bIsActive) {
        c.callback(this.preparingRounds);
        temp.push(c);
      }
    })
    this.successCallbacks = temp;
  }
}
