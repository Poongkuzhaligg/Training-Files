import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favourites } from '../model/favorite';
import { Product } from '../model/product';
import { User } from '../model/user';
import { AccountService } from './account.service';
import { ProductsService } from './products.service';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  currentUser: User;
  userFavoriteProducts: Favourites = {
    userEmail: '',
    userProducts: []
  };
  constructor(private http: HttpClient,
    private accountServ: AccountService,
    private productServ: ProductsService) {
  }

  async favoriteProducts() {
    this.currentUser = await this.accountServ.loggedUser();
    const favProducts = this.productServ.getAllProducts();
    this.userFavoriteProducts.userEmail = this.currentUser.email;
    // this.userFavoriteProducts.userProducts = favProducts;
    console.log(this.userFavoriteProducts);
  }
}
