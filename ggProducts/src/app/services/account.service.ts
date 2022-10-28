import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  users: User[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController) {
    this.getObject();
   }

  login(email: string, password: string){
    const eId = this.users.find( user => user.email === email);
    const pw = this.users.find( user => user.password === password);
    console.log(eId, pw);
    if(eId === undefined  ){
      this.presentAlert('Email does not exist, Kindly register!');
      return;
    }
    else if(pw === undefined){
      this.presentAlert('Password does not match, Try again!');
      return;
    }
    else if(eId === undefined && pw === undefined){
      this.presentAlert('Not registered!');
      return;
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
        this.presentAlert('"'+ userD.email + '" is already taken');
        return;
      }
      this.users = [userD, ...this.users];
      this.router.navigate(['../login']);
    }
    await this.setObject();
    console.log(this.users);
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'ALERT',
      subHeader: 'Data Invalid!',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }


}