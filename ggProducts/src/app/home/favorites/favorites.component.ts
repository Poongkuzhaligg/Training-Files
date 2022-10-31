import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../product';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favProducts: Product[];

  constructor(private productServ: ProductsService) { }

  ngOnInit() {
    this.favProducts = this.productServ.getAllProducts().filter((obj)=> obj.isFavourite === true);
    console.log(this.favProducts);
  }

}
