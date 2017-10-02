import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://yydb-9a6c4.firebaseapp.com';

  options: InAppBrowserOptions = {
    location: 'no',
    clearcache: 'yes',
    clearsessioncache: 'yes',
    // android
    hardwareback: 'no',
    zoom: 'no',
    // ios
    disallowoverscroll: 'yes',
    toolbar: 'no'
  }

  constructor(public db: AngularFireDatabase, public http: Http, public iab: InAppBrowser) {
  }

  getObject(endpoint: string) {
    return this.db.object(endpoint);
  }

  getList(endpoint: string, query?: any) {
    if (!query)
      return this.db.list(endpoint)
    else
      return this.db.list(endpoint, query);
  }

  log(title, message) {
    console.log(`---------- <API> starts here: ${title} ----------`);
    console.log(message);
    console.log('---------------------------------------');
  }

  makePayment(userId: string, targetId: string, amount: number, callback) {
    // create temp node to track status
    let tempId = "";
    let tempRef = this.getList(`/top-ups/${userId}/temp`).push({
      amount: amount
    }).then(snapshot => {
      tempId = snapshot.key;
      let paymentUrl = `${this.url}/payment.html?user_id=${userId}&target_id=${targetId}&amount=${amount}&temp_id=${tempId}`;
      const browser = this.iab.create(paymentUrl, "_blank", this.options);
      this.processingPayment(userId, tempId, browser, callback);
    });
  }

  processingPayment(userId: string, tempId: string, browser, callback) {
    let subscription = this.getObject(`/top-ups/${userId}/temp/${tempId}/status`).subscribe(status => {
      if (status.$value) {
        callback(status.$value);
        subscription.unsubscribe();
      }
    });
  }


  /*
  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options);
  }
  */

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}
