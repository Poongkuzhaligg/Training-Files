import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(private modalCtrl: ModalController,
    private productServ: ProductsService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productServ.products.subscribe(res => this.products = res);
  }

  addFav(favProd: Product) {
    console.log('works');
    favProd.isFavourite = !favProd.isFavourite;
    this.productServ.addFavorite(favProd);
    this.productServ.setStorageProduct(this.products);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
