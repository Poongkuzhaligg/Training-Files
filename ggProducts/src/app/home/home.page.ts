import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../account/account.service';
import { User } from '../user';
import { Product } from './product';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: Product[];
  users: User[];
  isModalOpen = false;
  currentPd: Product;

  constructor(private productServ: ProductsService) {}

  setClose(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpen(isOpen: boolean, code: string) {
    this.isModalOpen = isOpen;
    console.log(code);
    this.currentPd = this.products.find((obj) => obj.code === code);
    console.log(this.currentPd);
  }

  ngOnInit() {
    this.products = this.productServ.getAllProducts();

  }

  private loadAllUsers() {
    // this.accountServ.getAll().pipe(first()).subscribe(users => {
    //     this.users = users;
    // });
  }

}
