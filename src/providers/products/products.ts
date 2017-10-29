import { Injectable } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { Api } from '../api/api';
import { Product } from '../../models/product';

@Injectable()
export class ProductsService {
  localProducts: { [id: string]: Product; };

  productsMap = {};

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

  addProduct(data) {
    return this.api.insert('/products/', data);
  }

  editProduct(id, data) {
    return this.getAllProducts().update(id, data);
  }
  deleteProduct(id) {
    return this.getAllProducts().remove(id);
  }

  getAllProducts() {
    return this.api.getList('/products/');
  }

  getProduct(id) {
    return this.productsMap[id];
    //return this.api.getList('/products/', id);
  }

  getProductAsync(id) {
    if (this.getProduct(id)) {
      this.api.fireCustomEvent("productready", id);
    }
    else {
        this.getProductById_Internal(id).subscribe(product => {
          this.productsMap[id] = product;
          this.api.fireCustomEvent("productready", id);
        });
    }
  }
}
