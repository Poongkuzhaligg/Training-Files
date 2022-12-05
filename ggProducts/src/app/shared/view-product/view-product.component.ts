import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductSKU } from 'src/app/config/storage-key';
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
  products: Product[] = [];
  productSku = ProductSKU;

  constructor(private productService: ProductsService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.products.subscribe(res => this.products = res);
  }

  addFav(event: Event, favProd: Product) {
    event.stopPropagation();
    favProd.isFavourite = !favProd.isFavourite;
    this.productService.addFavorite(favProd);
    this.productService.setStorageProduct(this.product);
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
