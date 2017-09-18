import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Http, RequestOptions, URLSearchParams } from '@angular/http';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://example.com/api/v1';

  constructor(public db: AngularFireDatabase, public http: Http) {
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
