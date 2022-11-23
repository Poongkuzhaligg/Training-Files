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
  favProducts: Product[] = [];
  nofav = true;

  constructor(
    private productServ: ProductsService,
  ) {

  }
  ngOnInit() {
    this.getFavProducts();
  }


  ionViewWillEnter() {
    // alert('working');
  }

  async getFavProducts() {
    this.productServ.favproducts.subscribe((res: Product[]) => {
      if (!!res) {
        this.favProducts = res;
      } else {
        this.favProducts = [];
      }
    });
  }

}
