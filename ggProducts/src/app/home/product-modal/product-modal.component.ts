import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductSKU } from 'src/app/config/storage-key';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  @Input() openProduct: Product;
  products: Product[] = [];
  productSku = ProductSKU;

  constructor(private modalCtrl: ModalController,
    private productService: ProductsService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.products.subscribe(res => this.products = res);
  }

  addFav(favProd: Product) {
    favProd.isFavourite = !favProd.isFavourite;
    this.productService.addFavorite(favProd);
    this.productService.setStorageProduct(this.products);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
