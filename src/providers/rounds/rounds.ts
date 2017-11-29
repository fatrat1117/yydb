import { Injectable } from '@angular/core';
import { Subscription, Observable} from "rxjs/Rx"
import { FirebaseListObservable } from 'angularfire2/database';

import { Api } from '../api/api';
import { Product } from '../../models/product';
import { ProductsService } from '../products/products';
import { Round } from '../../models/round';
import { Draw } from '../../models/draw';
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

  getHistoryRounds(success_Callback) {
    let history: Round[];
    history = [];
    let subs = this.api.getList(`/users-expenses/${this.us.currentUser.id}`).subscribe(snapshots => {
      subs.unsubscribe();
      snapshots.forEach(s => {
        let roundId = s.$key;
        this.us.updateDrawsOfRound(roundId);

        let round = this.getLocalRound(roundId);
        if (round) {
          history.push(round);
          if (history.length == snapshots.length) {
            success_Callback(history);
          }
          return;
        }

        let subs1 = this.api.getObject(`/rounds/${roundId}`).subscribe(r => {
          subs1.unsubscribe();
          let callback = (p => {
            history.push(this.createNewRound(r, p));
            if (history.length == snapshots.length) {
              success_Callback(history);
            }
          })
          this.ps.getProductById(r.product_id, callback);
        })
      })
    })
  }

  getDrawHistory(success_callback) {
    console.log('enter getDrawHistory')
    let draws: Draw[];
    draws = [];
    let subs = this.api.getList('/draw-history').subscribe(snapshots => {
      subs.unsubscribe();
      snapshots.forEach(s => {
        // let callback = (draw => {
        //   if (draw) {
        //     draws.push(draw);
        //     if (draws.length == snapshots.length) {
        //       success_callback(draws);
        //     }
        //     return;
        //   }
        // });
        let productObservable = this.ps.getProductById_Internal(s.productId);
        let userObservable = this.us.getUserInfoObservable(s.winner);
        let subs2 = Observable.zip(productObservable,userObservable).subscribe(res => {
          subs2.unsubscribe();
          let now: number = new Date().getTime();
          // s.time = now + 30000;
          let draw = new Draw(s.$key, res[0], res[1], s.winnerNumber, s.time);
          
          console.log(now);
         
          if(now >= s.time) {
            draw.status = 'end';
          } else {
            draw.status = 'processing';
          }
          
          draw.count = s.records.length;
          // callback(draw);
          draws.push(draw);

        })

      })
      success_callback(draws);
    })
  }


  /************************************************************/
  /** All functions below should not be used directly in UI */
  /************************************************************/

  getLocalRound(id: string) {
    let round: Round;
    if (this.preparingRounds) {
      round = this.preparingRounds.find(r => r.id == id);
    }

    if (!round && this.processingRounds) {
      round = this.processingRounds.find(r => r.id == id);
    }

    return round;
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

  afCurrentRound(productId, count) {
    //return this.api.getList(`/draw-queque/${productId}/`);
    return this.api.getList(`/draw-queque/${productId}/`, {
      query: {
        limitToFirst: count
      }
    });
  }
}
