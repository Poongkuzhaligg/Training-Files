import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Product } from '../model/product';
import { ProductsService } from 'src/app/services/products.service';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import { ProductComponent } from './product/product.component';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@capacitor/storage';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router
  ) { }

  ngOnInit() {
    this.router.navigate(['home/products']);
  }

}
