import { Injectable } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { Api } from '../api/api';
import { Product } from '../../models/product';

@Injectable()
export class ProductsService {
  constructor(public api: Api) {
  }

  getProductById_Internal(id: string) {
    return this.api.getObject(`/products/${id}`);
  }

  /*
  getAll() {
    if (this.products == undefined) {
      this.api.log("get all products reference from cloud")
      this.products = this.api.get('/products');
    }


    this.products.subscribe(snapshots => {
      console.log(this.products);
      
      snapshots.forEach(p => {
        this.api.log(p.$key);
      })
    })

    return this.products;
  }
  */
}
