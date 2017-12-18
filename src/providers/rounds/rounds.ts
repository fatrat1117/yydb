import { Injectable } from '@angular/core';
import { Subscription, Observable, Observer} from "rxjs/Rx"
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
  historyDraws: Draw[];
  currentMinOrderNum: number = -Number.MAX_SAFE_INTEGER;

  selectedRound: Round;
  selectedRoundSubs: Subscription;
  constructor(public api: Api, public ps: ProductsService, public us: UserService) {
    this.historyDraws = [];
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

  getDrawListFromDB(count:number, successCallback:Function, isFirstQurery:boolean) {
    console.log('enter getDrawHistory');
    if(isFirstQurery) {
      this.currentMinOrderNum = -Number.MAX_SAFE_INTEGER;
    }
    let time_before:number = Date.now();
    let localDraws: Draw[] = [];
    let observables: any = [];
    let subs = this.api.getList('/draw-history/summary',{
      query: {
        orderByChild: 'orderNum',
        startAt: this.currentMinOrderNum,
        limitToFirst: count
      }
    }).subscribe(snapshots => {
      if(snapshots.length == 0) {
        successCallback({success: true, result: localDraws });
        return;
      }
      
      console.log('///////////////////////////////////');
      console.log(snapshots)
      subs.unsubscribe();
      let time_after:number = Date.now();
      console.log((time_after-time_before)/1000);
      snapshots.forEach(s => {
        let drawObservable = Observable.create((observer: Observer<any>)=> {
          observer.next(s);
          observer.complete();
        });
        let productObservable = this.ps.getProductById_Internal(s.productId);
        let userObservable = this.us.getUserInfoObservable(s.winner);
        
        observables.push(Observable.zip(drawObservable, productObservable,userObservable));
        if(this.currentMinOrderNum < s.orderNum) {
          this.currentMinOrderNum = s.orderNum + 1;
        }
        
      })
      console.log('observables.length= ' + observables.length)
      let time_before2:number = Date.now();
      let subs2 = Observable.zip(...observables).subscribe((res:any[]) => {
        console.log(res);
        let time_after2:number = Date.now();
        console.log('222222222222: ' + (time_after2-time_before2)/1000);
        subs2.unsubscribe();
        
        res.forEach(s => {
          let draw: Draw = new Draw(s[0].$key, s[1], s[2], s[0].winnerNumber, s[0].time, s[0].numOfRecords);
          draw.orderNum = s[0].orderNum;
          localDraws.push(draw);
          
        });
        if(isFirstQurery) {
          this.historyDraws.length = 0;
        }
        this.historyDraws.push(...localDraws);
        successCallback({success: true, result: localDraws });
        
      }, 
    (error) => {
      successCallback({success: false, result: error });
    });
      
    },
    (error) => {
      successCallback({success: false, result: error });
    })
  }



  getHistoryDraws() {
    return this.historyDraws;
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
