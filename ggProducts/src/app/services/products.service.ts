import { Injectable } from '@angular/core';
import { Product } from '../home/product';
import productData from 'src/assets/items/product.json';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = productData;

  constructor() { }

  getAllProducts() {
    return [...this.products];
  }

}
