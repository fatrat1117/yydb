import { Injectable } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { Api } from '../api/api';
import { Product } from '../../models/product';

@Injectable()
export class ProductsService {
  localProducts: { [id: string]: Product; };

  constructor(public api: Api) {
    this.localProducts = {};
  }

  getProductById(id: string, success_Callback) {
    if (this.localProducts[id]) {
      success_Callback(this.localProducts[id]);
    }
    else {
      let subs = this.getProductById_Internal(id).subscribe(snapshot => {
        let p = new Product(snapshot.$key, snapshot.name);
        if (snapshot.images) {
          p.images = snapshot.images;
        }
        this.localProducts[id] = p;
        subs.unsubscribe();
        success_Callback(this.localProducts[id]);
      })
    }
  }

  getProductById_Internal(id: string) {
    return this.api.getObject(`/products/${id}`);
  }

   add(data) {
    return   this.api.insert('/product/', data);
  }


  
  getAll() {
       return this.api.getList('/product/');
  }

/*
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
