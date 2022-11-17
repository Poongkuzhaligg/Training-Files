import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Product } from '../model/product';
import { ProductsService } from 'src/app/services/products.service';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import { ProductComponent } from './product/product.component';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@capacitor/storage';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm: string;
  products: Product[];
  users: User[];
  temporaryProducts = [];
  searchProduct = false;
  isModalOpen = false;
  isFavourite = false;
  viewProduct: Product;
  currentUsername: string;

  constructor(private productServ: ProductsService,
    private modalCtrl: ModalController,
    private accountServ: AccountService,
    private http: HttpClient,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController
  ) { }

  async openModal(openProduct: Product) {
    const modal = await this.modalCtrl.create({
      component: ProductComponent,
      componentProps: {
        openProduct
      }
    });
    modal.present();
  }

  async ngOnInit() {
    this.menuCtrl.close();
    this.showLoading();
    this.accountServ.currrentUsername.subscribe(data => this.currentUsername = data);
    await this.getProducts();
  }

  async getProducts() {
    const deviceStatus: boolean = navigator.onLine;
    if (deviceStatus === true) {
      this.productServ.getAllProducts().subscribe((res: any[]) => {
        this.products = res;
        // console.log(res);
        this.productServ.setStorageProduct(this.products);
      });
    } else {
      this.products = await this.productServ.getStorageProduct();
    }
  }


  onFilterValueChange() {

    if (this.products.filter(data => this.filterProductData(data)).length === 0) {
      this.searchProduct = true;
      return;
    }
    this.searchProduct = false;
  }

  addFav(event: Event, favProd: Product) {
    event.stopPropagation();
    favProd.isFavourite = !favProd.isFavourite;
    this.productServ.setStorageProduct(this.products);
    console.log(favProd.code);
    this.http.post(environment.apiUrl + 'favourites/products/set-unset', {}).subscribe(res => console.log(res));

  }

  filterProductData(product: Product) {
    return product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      || product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      || product.code.includes(this.searchTerm);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 500,
      spinner: 'circles',
    });

    loading.present();
  }

  close() {
    this.menuCtrl.close();
  }

  logout() {
    this.accountServ.logout();
  }


}
