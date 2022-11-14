import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../model/product';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favProducts: Product[] = [];
  nofav = true;
  constructor(private productServ: ProductsService,
    private modalCtrl: ModalController) { }

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
    await this.getFavProducts();
  }

  async getFavProducts() {
    // const deviceStatus: boolean = navigator.onLine;
    // if (deviceStatus === true) {
    //   await this.productServ.getAllProducts().subscribe((res: Product[]) => {
    //     this.favProducts = res.filter((obj) => obj.isFavourite === true);
    //   });
    // } else {
    const favorites = await this.productServ.getStorageProduct();
    this.favProducts = favorites.filter(res => res.isFavourite === true);
    // }
  }

}
