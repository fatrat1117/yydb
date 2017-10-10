import { Injectable } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { Api } from '../api/api';
import { Product } from '../../models/product';
import { ProductsService } from '../products/products';
import { Round } from '../../models/round';
import { UserService } from '../user/user';


@Injectable()
export class RoundsService {
  preparingRounds: Round[];

  constructor(public api: Api, public ps: ProductsService, public us: UserService) {
  }

  // rounds will be updated in real time
  getPreparingRounds() {
    if (this.preparingRounds != undefined) {
      this.api.fireCustomEvent("PreparingRoundsReady", this.preparingRounds);
      return;
    }
    else
    {
      // 1st time call
      this.preparingRounds = [];
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
            this.api.fireCustomEvent("PreparingRoundsReady", this.preparingRounds);
          }
        })
        this.ps.getProductById(r.product_id, callback);
      })
    })
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
}
