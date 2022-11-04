import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../product';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favProducts: Product[];

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

  ngOnInit() {
    this.favProducts = this.productServ.getAllProducts().filter((obj)=> obj.isFavourite === true);
  }

}
