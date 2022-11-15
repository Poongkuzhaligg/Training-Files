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
  products: Product[] = productData;

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(environment.apiUrl + 'products', { withCredentials: true });
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

}


