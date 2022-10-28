import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Product } from './product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm: string;
  products: Product[];
  favProducts: Product[] =[];
  users: User[];
  isModalOpen = false;
  viewProduct: Product;
  favorite = false;

  constructor(private productServ: ProductsService) {}

  setClose(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpen(isOpen: boolean, code: string) {
    this.isModalOpen = isOpen;
    console.log(code);
    this.viewProduct = this.products.find((obj) => obj.code === code);
  }

  ngOnInit() {
    this.products = this.productServ.getAllProducts();
  }

  addFav(favProd: Product){
    favProd.isFavourite = !favProd.isFavourite;
    if(favProd.isFavourite === true){
      this.favProducts.push(favProd);
      console.log(this.favProducts);
    }
    else{
      const indx = this.favProducts.indexOf(favProd);
      this.favProducts.splice(indx);
      console.log(this.favProducts);
    }
  }

}
