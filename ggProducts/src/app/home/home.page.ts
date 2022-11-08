import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Product } from './product';
import { ProductsService } from 'src/app/services/products.service';
import { ModalController } from '@ionic/angular';
import { ProductComponent } from './product/product.component';
import { AccountService } from '../services/account.service';

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
  currentUser: User;

  constructor(private productServ: ProductsService,
    private modalCtrl: ModalController,
    private accountServ: AccountService
    ) {}

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
    this.products = this.productServ.getAllProducts();
    this.currentUser = await this.accountServ.loggedUser();
  }

  onFilterValueChange(){

    if(this.products.filter(data => this.filterProductData(data)).length === 0){
      this.searchProduct = true;
      return;
    }
    this.searchProduct = false;
  }

  addFav(favProd: Product){
    favProd.isFavourite = !favProd.isFavourite;
  }

  logout(){
    this.accountServ.logout();
  }

  filterProductData(product: Product) {
    return product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    || product.code.includes(this.searchTerm);
  }

}
