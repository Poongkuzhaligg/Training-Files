import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  allPrdt: Product[];
  prdt: Product;
  code: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private products: ProductsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
    this.code = paramMap.get('code');
  });
  this.allPrdt = this.products.getAllProducts();
  this.prdt = this.allPrdt.find((obj) => obj.code === this.code);
  console.log(this.prdt);
}






}
