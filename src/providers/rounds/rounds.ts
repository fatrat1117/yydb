import { Injectable } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { Api } from '../api/api';
import { Product } from '../../models/product';
import { ProductsService } from '../products/products';
import { Round } from '../../models/round';


@Injectable()
export class RoundsService {
  preparingRounds: Round[];

  constructor(public api: Api, public ps: ProductsService) {
  }

  // rounds will be updated in real time
  getPreparingRounds(success_Callback) {
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
        let callback = (p=> {
          this.preparingRounds.push(this.createNewRound(r, p));
          if (this.preparingRounds.length == snapshots.length) {
            this.api.log("get preparing rounds", this.preparingRounds);
            success_Callback(this.preparingRounds);
          }
        })
        this.ps.getProductById(r.product_id, callback);
      })
    })
  }

  createNewRound(round: any, product: Product) {
    let r = new Round(round.$key, product);
    if (round.draw_counts != undefined) {
      r.drawCounts.current = round.draw_counts.current || 0;
      r.drawCounts.target = round.draw_counts.target || 0;
    }
    return r;
  }

  addDraws(roundId: string, want: number) {
    let draws = {};
    this.api.getList(`/rounds-draws/${roundId}/waiting-list`).push({
      want: want
    })
  }
}
