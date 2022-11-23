import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import productData from 'src/assets/items/product.json';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@capacitor/storage';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: BehaviorSubject<Product[]> = new BehaviorSubject(null);
  favproducts: BehaviorSubject<Product[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.getAllProducts();
    this.getFavProducts();
  }

  getAllProducts() {
    this.http.get(environment.apiUrl + 'product', { withCredentials: true })
      .subscribe(
        (res: Product[]) => {
          this.products.next(res);
          this.setStorageProduct(res);
          // console.log(res);
        },
        async err => {
          this.products = await this.getStorageProduct();
        }
      );
  }

  setFavProducts(productId) {
    return this.http.post(environment.apiUrl + 'product/favourite/set-unset', { productid: productId }, { withCredentials: true });
  }

  getFavProducts() {
    return this.http.post(environment.apiUrl + 'product/favourite/userId', { withCredentials: true })
      .subscribe(
        (res: Product[]) => {
          this.favproducts.next(res);
          this.setFavProductStorage(res);
          // console.log('favorites from api', res);
        },
        async err => {
          this.favproducts = await this.getFavProductStorage();
        }
      );
  }

  addFavorite(favProd: Product) {
    this.setFavProducts(favProd.productid).subscribe(res => {
      const products = this.favproducts.value;

      if (favProd.isFavourite === true) {
        products.push(favProd);
      }
      else {
        const index = products.indexOf(favProd);
        if (index >= 0) {
          products.splice(index, 1);
        }
      }
      this.favproducts.next(products);
      this.setStorageProduct(this.products.value);
      this.setFavProductStorage(this.favproducts.value);
    });
  }

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

  async setFavProductStorage(fProduct) {
    await Storage.set({
      key: 'favProduct',
      value: JSON.stringify(fProduct)
    });
  }

  async getFavProductStorage() {
    const ret = await Storage.get({ key: 'favProduct' });
    return JSON.parse(ret.value);
  }

}


