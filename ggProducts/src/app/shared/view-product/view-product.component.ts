import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModalComponent } from '../../home/product-modal/product-modal.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {
  @Input() product: Product;
  constructor(private productServ: ProductsService,
    private modalCtrl: ModalController) { }

  ngOnInit() { }

  addFav(event: Event, favProd: Product) {
    event.stopPropagation();
    favProd.isFavourite = !favProd.isFavourite;
    this.productServ.addFavorite(favProd);
  }

  async openModal(openProduct: Product) {
    const modal = await this.modalCtrl.create({
      component: ProductModalComponent,
      componentProps: {
        openProduct
      }
    });
    modal.present();
  }
}
