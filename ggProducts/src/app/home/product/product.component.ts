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
  categoryKitchen = false;
  categoryHealth = false;
  categoryFitness = false;
  products: Product[] = [];
  categoryProducts: Product[] = [];
  searchProduct = false;
  isFavourite = false;
  currentProfile: User;

  constructor(private productServ: ProductsService,
    private accountServ: AccountService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.accountServ.currrentProfile.subscribe(data => this.currentProfile = data);
    this.getProducts();
  }

  getProducts() {
    this.productServ.products.subscribe(res => this.products = res);
  }

  onFilterValueChange() {
    if (this.products.filter(data => this.filterProductData(data)).length === 0) {
      this.searchProduct = true;
      return;
    }
    this.searchProduct = false;
  }

  filterProductData(product: Product) {
    return product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      || product.code.includes(this.searchTerm);
  }


  selectCategory(category) {
    if (category === 'health and wellness') {
      this.categoryHealth = !this.categoryHealth;
    }
    else if (category === 'Fitness') {
      this.categoryFitness = !this.categoryFitness;
    }
    else {
      this.categoryKitchen = !this.categoryKitchen;
    }
    this.getProducts();
    this.categoryProducts = this.products;
    this.categorizeProducts();
    if (this.searchTerm !== undefined) {
      this.onFilterValueChange();
    }
  }

  categorizeProducts() {
    if (this.categoryHealth === true && this.categoryFitness === true && this.categoryKitchen === false) {
      this.categoryProducts = this.products.filter(p => (p.category === 'health and wellness') || (p.category === 'Fitness'));
      this.products = this.categoryProducts;
    }
    else if (this.categoryHealth === true && this.categoryFitness === false && this.categoryKitchen === false) {
      this.categoryProducts = this.products.filter(p => p.category === ('health and wellness'));
      this.products = this.categoryProducts;
    }
    else if (this.categoryHealth === false && this.categoryFitness === true && this.categoryKitchen === true) {
      this.categoryProducts = this.products.filter(p => p.category === ('Fitness') || (p.category === 'Kitchen and home'));
      this.products = this.categoryProducts;
    }
    else if (this.categoryHealth === false && this.categoryFitness === false && this.categoryKitchen === true) {
      this.categoryProducts = this.products.filter(p => p.category === ('Kitchen and home'));
      this.products = this.categoryProducts;
    }
    else if (this.categoryHealth === false && this.categoryFitness === true && this.categoryKitchen === false) {
      this.categoryProducts = this.products.filter(p => p.category === ('Fitness'));
      this.products = this.categoryProducts;
    }
    else if (this.categoryHealth === true && this.categoryFitness === false && this.categoryKitchen === true) {
      this.categoryProducts = this.products.filter(p => p.category === ('Kitchen and home') || (p.category === 'health and wellness'));
      this.products = this.categoryProducts;
    }
    else {
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
