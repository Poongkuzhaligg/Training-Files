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

  constructor(private productServ: ProductsService,
    private accountServ: AccountService) {}

  ngOnInit() {
    this.products = this.productServ.getAllProducts();
    this.loadAllUsers();

  }

  private loadAllUsers() {
    this.accountServ.getAll().pipe(first()).subscribe(users => {
        this.users = users;
    });
  }

}
