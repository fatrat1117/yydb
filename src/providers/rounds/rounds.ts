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

  getPreparingRounds_Internal(success_Callback) {
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
        // Get product once only
        let subs = this.ps.getProductById_Internal(r.product_id).subscribe(p => {
          this.api.log("get product", p);
          subs.unsubscribe();

          // Add new round
          let product = new Product(p.$key, p.name);
          let round = new Round(r.$key, product);
          this.preparingRounds.push(round);

          // check if all done
          if (this.preparingRounds.length == snapshots.length) {
            this.api.log("get preparing rounds", this.preparingRounds);
            success_Callback(this.preparingRounds);
          }
        })
      })
    })
  }
}
