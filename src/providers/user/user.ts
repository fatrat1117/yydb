import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Api } from '../api/api';
import { User } from '../../models/user';

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

  constructor(public http: Http, public api: Api) {
    this.currentUser = new User("mock-user-id-0");
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

  getDrawsOfRound_Internal(roundId: string) {
    return this.api.getList(`/users-expenses/${this.currentUser.id}/${roundId}/`);
  }
}
