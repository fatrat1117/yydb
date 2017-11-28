import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Api } from '../api/api';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class UserService {
  currentUser: User;
  user;
  constructor(public http: Http,
    public api: Api,
    public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        console.log('user changed', this.user);
        this.currentUser = new User(user.uid);
        this.getUserInfo();
        //document.dispatchEvent(new Event("userlogin"));
      }
    })
  }

  login(accountInfo: any) {
  }

  signup(accountInfo: any) {
  }

  logout() {
    this.currentUser = null;
  }

  _loggedIn(resp) {
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getUserInfo() {
    let subs = this.api.getObject(`/users/${this.currentUser.id}`).subscribe(snapshot => {
      this.currentUser.updateBasicInfo(snapshot.name, snapshot.avatar, snapshot.balance);
      subs.unsubscribe();
    })
  }

  updateDrawsOfRound(roundId: string, newDeal: number = 0) {
    if (newDeal == 0 && this.currentUser.draws[roundId] != undefined)
      return;

    let subs = this.getDrawsOfRound_Internal(roundId).subscribe(snapshots => {
      let draws = [];
      snapshots.forEach(s => {
        draws.push(s.$key);
      })
      subs.unsubscribe();
      this.currentUser.draws[roundId] = draws;
    })
  }

  makePayment(targetId: string, amount: number) {
    this.api.makePayment(this.currentUser.id, targetId, amount);
  }

  getDrawsOfRound_Internal(roundId: string) {
    return this.api.getList(`/users-expenses/${this.currentUser.id}/${roundId}/`);
  }

  uid() {
    if (this.currentUser)
      return this.currentUser.id;
  }

  getUserInfoObservable(userId: string) {
    return this.api.getObject(`/users/${userId}`);
  }
}
