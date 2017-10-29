import { Injectable } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { Api } from '../api/api';
import { Product } from '../../models/product';

@Injectable()
export class ProductsService {
  localProducts: { [id: string]: Product; };
  launchedProducts = [];

  constructor(public api: Api) {
    this.localProducts = {};
  }

  getProductById(id: string, success_Callback) {
    // if (this.localProducts[id]) {
    //   success_Callback(this.localProducts[id]);
    // }
    // else {
    //   let subs = this.getProductById_Internal(id).subscribe(snapshot => {
    //     let p = new Product(snapshot.$key);
    //     p.name = snapshot.name;
    //     if (snapshot.images) {
    //       p.images = snapshot.images;
    //     }
    //     this.localProducts[id] = p;
    //     subs.unsubscribe();
    //     success_Callback(this.localProducts[id]);
    //   })
    // }
  }

  getProductById_Internal(id: string) {
    return this.api.getObject(`/products/${id}`);
  }

  getLaunchedProduct(id) {
    return this.api.getObject(`/launched-products/${id}`);
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
    //console.log(this.localProducts[id]);
    return this.localProducts[id];
    //return this.api.getList('/products/', id);
  }

  getProductAsync(id) {
    if (this.getProduct(id)) {
      //console.log('productready');
      this.api.fireCustomEvent("productready", id);
    }
    else {
        this.getProductById_Internal(id).subscribe(p => {
          console.log(p);
          let prod = this.findOrCreate(id);
          prod.name = p.name;
          prod.price = p.price;
          prod.images = p.images;
          this.api.fireCustomEvent("productready", id);
        });

        this.getLaunchedProduct(id).subscribe(p => {
          //console.log(p);
          let prod = this.findOrCreate(id);
          prod.participants = p.participants;
        });
    }
  }

  findOrCreate(id): Product {
    let prod;
    if (this.getProduct(id))
      prod = this.getProduct(id);
    else {
      prod = new Product(id);
      this.localProducts[id] = prod;
    }
    return prod;
  }

  findOrCreateAndPull(id): Product {
    let prod;
    if (this.getProduct(id))
      prod = this.getProduct(id);
    else {
      prod = new Product(id);
      this.getProductAsync(id);
      this.localProducts[id] = prod;
    }
    return prod;
  }

  getLaunchedProducts() {
    let sub = this.api.getList('/launched-products/').subscribe(launchedProducts => {
      sub.unsubscribe();
      this.launchedProducts.splice(0);
      launchedProducts.forEach(p => {
        let id = p.$key;
        let prod = this.findOrCreateAndPull(id);
        this.launchedProducts.push(prod);
        //prod.participants = p.participants;
      });
    });

    return this.launchedProducts;
  }
}
