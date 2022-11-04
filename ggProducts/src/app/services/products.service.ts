import { Injectable, OnInit } from '@angular/core';
import { Product } from '../home/product';
import productData from 'src/assets/items/product.json';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService  {
  products: Product[] = productData;

  constructor(private http: HttpClient) {}



  getAllProducts() {
    // this.http.get<Product[]>('http://192.168.0.176:3000/products')
    // .subscribe(response => {
    //   console.log(response);
    // });
    return this.products;
  }

  }


