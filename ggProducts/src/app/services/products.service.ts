import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import productData from 'src/assets/items/product.json';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@capacitor/storage';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[];

  constructor(private http: HttpClient) {
    this.getAllProducts();
    // this.loadProducts();
    // console.log('serv', this.products);
  }

  // loadProducts() {
  //   this.http.get(environment.apiUrl + 'product', { withCredentials: true })
  //     .subscribe(
  //       (res: Product[]) => {
  //         this.products = res;
  //         console.log('loading products', res, this.products);
  //       },
  //       async err => {
  //         this.products = await this.getStorageProduct();
  //       }
  //     );
  // }

  getAllProducts() {
    return this.http.get(environment.apiUrl + 'product', { withCredentials: true });
    // .subscribe(
    //   (res: Product[]) => {
    //     this.products = res;
    //     console.log(res);
    //   },
    //   async err => {
    //     this.products = await this.getStorageProduct();
    //   }
    // );
  }

  setFavProducts(productId) {
    return this.http.post(environment.apiUrl + 'product/favourite/set-unset', { productid: productId }, { withCredentials: true });
  }

  getFavProducts() {
    return this.http.post(environment.apiUrl + 'product/favourite/userId', { withCredentials: true });
  }


  // getDBproducts() {
  //   this.getAllProducts().subscribe(
  //     (res: Product[]) => {
  //       this.products = res;
  //       console.log(this.products, 'hey');
  //     },
  //     async err => {
  //       this.products = await this.getStorageProduct();
  //       throw (err);
  //     });
  // }

  // getDBFavorites(){
  // }

  async setStorageProduct(product) {
    await Storage.set({
      key: 'product',
      value: JSON.stringify(product)
    });
  }


  async getStorageProduct() {
    const ret = await Storage.get({ key: 'product' });
    return JSON.parse(ret.value);
  }

}


