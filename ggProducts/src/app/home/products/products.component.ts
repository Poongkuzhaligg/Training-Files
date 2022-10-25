import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';

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

  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
    this.code = paramMap.get('code');
    console.log(this.code);
  });
}


}
