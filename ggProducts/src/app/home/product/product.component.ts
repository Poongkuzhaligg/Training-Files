import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NotFoundText, ProductCategory } from 'src/app/config/storage-key';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account.service';
import { ProductsService } from 'src/app/services/products.service';
import categoryList from 'src/assets/items/categoryList.json';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  notFound = NotFoundText;
  categoryList = categoryList;
  categories: string[] = [];
  searchTerm: string;
  category = ProductCategory;
  products: Product[] = [];
  categoryProducts: Product[] = [];
  searchProduct = false;
  isFavourite = false;
  currentProfile: User;

  constructor(private productService: ProductsService,
    private accountService: AccountService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    this.accountService.currrentProfile.subscribe(data => this.currentProfile = data);
    this.getProducts();
  }

  getProducts() {
    this.productService.products.subscribe(res => this.products = res);
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

  selectCategory(category: string) {
    if (!this.categories.includes(category)) {
      this.categories.push(category);
    }
    else {
      const index = this.categories.indexOf(category);
      this.categories.splice(index, 1);
    }
    this.getProducts();
    this.filterCategories(this.categories);
    if (this.searchTerm !== undefined) {
      this.onFilterValueChange();
    }
  }

  filterCategories(categories: string[]) {
    if (categories.length > 0 && categories.length < 3) {
      const category1 = categories[0];
      const category2 = categories[1];
      this.categoryProducts = this.products.filter(p => (p.category === category1) || (p.category === category2));
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


