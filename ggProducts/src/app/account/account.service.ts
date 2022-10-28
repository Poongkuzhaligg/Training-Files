import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  users: User[] = [];

  constructor(private http: HttpClient,
    private router: Router,
    ) {
    this.getObject();
   }

  login(email: string, password: string){
    const eId = this.users.find( user => user.email === email);
    const pw = this.users.find( user => user.password === password);
    console.log(eId, pw);
    if(eId.email !== email ){
      return alert('Email does not exists, Kindly register!');
    }
    else if(pw.password !== password){
      return alert('Password does not match, Try again!');
    }
    else if(eId === undefined && pw === undefined){
      return alert('Not registered!');
    }
    else{
    this.router.navigate(['../home']);
    }

  }


  async setObject(): Promise<void> {
    await Storage.set({
      key: 'users',
      value: JSON.stringify(this.users)
    });
  }

  async getObject() {
    const ret = await Storage.get({ key: 'users' });
    const user = JSON.parse(ret.value);
    console.log('user', ret);
    if(ret !== null){
      this.regUser(user);
    }
  }

  async regUser(userD: User) {
    if(this.users.length === 0){
      this.users.push(userD);
    }
    else {
      const foundUser = this.users.find((obj) => obj.email === userD.email);
      if(foundUser){
        alert(userD.email + '" is already taken');
        return;
      }
      this.users = [userD, ...this.users];
      this.router.navigate(['../login']);
    }
    await this.setObject();
    console.log(this.users);
  }

  getAll() {

  }


}
