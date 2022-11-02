import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Product } from './product';
import { ProductsService } from 'src/app/services/products.service';
import { ModalController } from '@ionic/angular';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm: string;
  products: Product[];
  users: User[];
  isModalOpen = false;
  isFavourite = false;
  viewProduct: Product;

  constructor(private productServ: ProductsService,
    private modalCtrl: ModalController
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
  // setClose(isOpen: boolean) {
  //   this.isModalOpen = isOpen;
  // }

  // setOpen(isOpen: boolean, product: Product) {
  //   this.viewProduct = product;
  //   if(this.viewProduct) {
  //     this.isModalOpen = isOpen;
  //   }
  // }

  ngOnInit() {
    this.products = this.productServ.getAllProducts();
  }

  addFav(favProd: Product){
    favProd.isFavourite = !favProd.isFavourite;
  }

}
