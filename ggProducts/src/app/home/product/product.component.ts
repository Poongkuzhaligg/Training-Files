import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  searchTerm: string;
  products: BehaviorSubject<Product[]> = new BehaviorSubject(null);
  searchProduct = false;
  isModalOpen = false;
  isFavourite = false;
  viewProduct: Product;
  currentProfile: User;

  constructor(private productServ: ProductsService,
    private modalCtrl: ModalController,
    private accountServ: AccountService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    // this.showLoading();
    this.accountServ.currrentProfile.subscribe(data => this.currentProfile = data);
    // this.products = this.productServ.products;
    // console.log('heyoo', this.products);
    this.getProducts();
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

  async getProducts() {
    const deviceStatus: boolean = navigator.onLine;
    if (deviceStatus === true) {
      this.productServ.getAllProducts().subscribe(
        (res: Product[]) => {
          this.products.next(res);
        },
        async err => {
          this.products = await this.productServ.getStorageProduct();
          console.log('this is error', err);
        });
    } else {
      this.products = await this.productServ.getStorageProduct();
    }

  }


  onFilterValueChange() {

    if (this.products.value.filter(data => this.filterProductData(data)).length === 0) {
      this.searchProduct = true;
      return;
    }
    this.searchProduct = false;
  }

  addFav(event: Event, favProd: Product) {
    event.stopPropagation();
    favProd.isFavourite = !favProd.isFavourite;
    this.productServ.setStorageProduct(this.products);
    this.productServ.setFavProducts(favProd.productid).subscribe(res => console.log(res));
  }

  filterProductData(product: Product) {
    return product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      || product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      || product.code.includes(this.searchTerm);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Fetching Products...',
      duration: 500,
      spinner: 'circles',
    });

    loading.present();
  }

}
