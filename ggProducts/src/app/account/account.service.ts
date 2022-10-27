import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';
import { Storage } from '@capacitor/storage';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentUser: User;
  users: User[] = [];

  constructor(private http: HttpClient) {
    this.getObject();
   }

  login(email: string, password: string){
    console.log(email, password);

  }

  register(userD: User) {
    const foundUser = this.users.find( user => user.email === userD.email);
    this.currentUser = userD;
  }


  async setObject() {
    await Storage.set({
      key: 'user',
      value: JSON.stringify(this.users)
    });
  }

  async getObject() {
    const ret = await Storage.get({ key: 'users' });
    const user = JSON.parse(ret.value);
    console.log('user', ret);
    if(ret !== null){
      this.addUser(user);
    }
  }

  async addUser(userD: User) {
    if(this.users.length === 0){
      this.users.push(userD);
    }
    else {
      this.users = [userD, ...this.users];
    }
    await this.setObject();
    console.log(this.users);
  }

  getAll() {

  }


}
