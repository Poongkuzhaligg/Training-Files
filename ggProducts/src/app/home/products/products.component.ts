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
  this.prdt = this.products.getAllProducts();
}






}
