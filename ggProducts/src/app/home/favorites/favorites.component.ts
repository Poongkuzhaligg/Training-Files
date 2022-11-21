import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../model/product';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  products: Product[];
  favProducts: BehaviorSubject<Product[]> = new BehaviorSubject(null);
  nofav = true;

  constructor(
    private productServ: ProductsService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    // alert('working');
    this.getFavProducts();
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

  async getFavProducts() {
    // alert('working1');
    const deviceStatus: boolean = navigator.onLine;
    if (deviceStatus === true) {
      this.productServ.getAllProducts().subscribe(
        (res: Product[]) => {
          this.products = res;
        },
        async err => {
          this.products = await this.productServ.getStorageProduct();
          console.log('this is error', err);
        });
      await this.productServ.getFavProducts().subscribe((res: Product[]) => {
        this.favProducts.next(res);
      });
    } else {
      this.products = await this.productServ.getStorageProduct();
      this.favProducts.next(this.products.filter(res => res.isFavourite === true));
    }

  }

  addFav(event: Event, favProd: Product) {
    event.stopPropagation();
    favProd.isFavourite = !favProd.isFavourite;
    setTimeout(() => {
      this.getFavProducts();
    }, 100);
    this.productServ.setStorageProduct(this.products);
    this.productServ.setFavProducts(favProd.productid).subscribe(res => console.log(res));
  }
}
