import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ViewDidEnter } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  searchTerm: string;
  categoryFixed = false;
  products: Product[] = [];
  searchProduct = false;
  isFavourite = false;
  currentProfile: User;

  constructor(private productServ: ProductsService,
    private accountServ: AccountService,
    private loadingCtrl: LoadingController
  ) {
  }
  ngOnInit() {
    this.accountServ.currrentProfile.subscribe(data => this.currentProfile = data);
    this.getProducts();
  }

  ionViewWillEnter() {
  }

  getProducts() {
    this.productServ.products.subscribe(res => this.products = res);
  }

  filterProductData(product: Product) {
    return product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      || product.code.includes(this.searchTerm);
  }

  onFilterValueChange() {
    if (this.products.filter(data => this.filterProductData(data)).length === 0) {
      this.searchProduct = true;
      return;
    }
    this.searchProduct = false;
  }

  selectCategory(category) {
    this.categoryFixed = !this.categoryFixed;
    console.log(this.categoryFixed);
    if (this.categoryFixed === true) {
      this.getProducts();
      let categoryProducts: Product[] = this.products;
      categoryProducts = this.products.filter(p => p.category === category);
      this.products = categoryProducts;
    } else {
      this.getProducts();
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Fetching Products...',
      duration: 500,
      spinner: 'circles',
    });

    loading.present();
  }

}
