import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { STORAGE_KEY } from '../config/storage-key';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@capacitor/storage';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AccountService } from './account.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  favProductsId = [];
  products: BehaviorSubject<Product[]> = new BehaviorSubject(null);
  favproducts: BehaviorSubject<Product[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private toastController: ToastController, private accountServ: AccountService) {
    this.getAllProducts();
    this.getFavProducts();
  }

  getAllProducts() {
    this.http.get(environment.apiUrl + 'product', { withCredentials: true })
      .subscribe(
        (res: Product[]) => {
          this.products.next(res);
          this.setStorageProduct(res);
        },
        async err => {
          if (err.status === 504 || err.status === 500) {
            this.presentToast('An error has occured, Please Try again, ', 'danger');
            this.accountServ.logout();
          }
          this.products.next(await this.getStorageProduct());
        }
      );
  }

  setFavProducts(productId) {
    return this.http.post(environment.apiUrl + 'product/favourite/set-unset', { productid: productId }, { withCredentials: true });
  }

  getFavProducts() {
    return this.http.post(environment.apiUrl + 'product/favourite/userId', { withCredentials: true })
      .subscribe(
        (res: Product[]) => {
          this.favproducts.next(res);
          this.setFavProductStorage(res);
        },
        async err => {
          if (err.status === 504 || err.status === 500) {
            this.presentToast('An error has occured, Please Try again, ', 'danger');
            this.accountServ.logout();
          }
          this.favproducts.next(await this.getFavProductStorage());
        }
      );
  }

  addFavorite(favProd: Product) {
    this.setFavProducts(favProd.productid).subscribe(res => {
      const products = this.favproducts.value;
      if (favProd.isFavourite === true) {
        products.push(favProd);
      }
      else {
        const index = products.indexOf(favProd);
        if (index >= 0) {
          products.splice(index, 1);
        }
      }
      this.favproducts.next(products);
      this.setStorageProduct(this.products.value);
      this.setFavProductStorage(this.favproducts.value);
    }, err => {
      if (err.status === 504 || err.status === 500) {
        this.presentToast('An error has occured, Please Try again, ', 'danger');
        this.accountServ.logout();
      }
      const deviceStatus: boolean = navigator.onLine;
      this.products
        .subscribe(res => {
          this.favproducts.next(res.filter(p => p.isFavourite === true));
          this.setFavProductStorage(this.favproducts.value);
        });
      this.favProductsId.push(favProd.productid);
      if (deviceStatus === true) {
        if (this.favProductsId.length > 0) {
          this.favProductsId.forEach(res => this.setFavProducts(res));
        }
      }
    });
  }

  async setStorageProduct(product) {
    await Storage.set({
      key: STORAGE_KEY.userProducts,
      value: JSON.stringify(product)
    });
  }

  async getStorageProduct() {
    const ret = await Storage.get({ key: STORAGE_KEY.userProducts });
    return JSON.parse(ret.value);
  }

  async setFavProductStorage(fProduct) {
    await Storage.set({
      key: STORAGE_KEY.userFavProducts,
      value: JSON.stringify(fProduct)
    });
  }

  async getFavProductStorage() {
    const ret = await Storage.get({ key: STORAGE_KEY.userFavProducts });
    return JSON.parse(ret.value);
  }

  async presentToast(messageIn: string, colorIn: string) {
    const toast = await this.toastController.create({
      message: messageIn,
      duration: 2000,
      cssClass: 'toast',
      position: 'top',
      color: colorIn
    });
    await toast.present();
  }

}


