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
  currentUser: User;

  constructor(
    private router: Router,
    private alertController: AlertController) {
    this.getUser();
    console.log('capCurrentUSer', this.loggedUser());
  }

  async loggedUser(){
    const userResult = await Storage.get({key: 'currentUsers'});
    return JSON.parse(userResult.value);
  }

  login(email: string, password: string){
    const eId = this.users.find( user => user.email === email);
    const pw = this.users.find( user => user.password === password);
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
    this.router.navigate(['../home']);
    this.currentUser = eId;
    this.setCurrentUser();

  }

  async editForm(username: string, password: string){
      const ret = await Storage.get({ key: 'users' });
      const user = JSON.parse(ret.value);
      const cUser = user.find( (obj)=> obj.username === this.currentUser.username );
      console.log(username, password);
      //update current user with new values.
  }

  async regUser(userDetails: User) {
    if(this.users.length === 0){
      this.users.push(userDetails);
    }
    else {
      const foundUser = this.users.find((obj) => obj.email === userDetails.email);
      if(foundUser){
        this.presentAlert('"'+ userDetails.email + '" is already taken');
        return;
      }
      this.users = [userDetails, ...this.users];
    }
    this.router.navigate(['../login']);
    await this.setUser();
    console.log(this.users);
  }

  async setUser(): Promise<void> {
    await Storage.set({
      key: 'users',
      value: JSON.stringify(this.users)
    });
  }

  async getUser() {
    const ret = await Storage.get({ key: 'users' });
    const user = JSON.parse(ret.value);
    if(user.length === 0){
      return;
    }
    else{
      this.users = [this.users, ...user];
    }
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

  async setCurrentUser(): Promise<void> {
    await Storage.set({
      key: 'currentUsers',
      value: JSON.stringify(this.currentUser)
    });
  }

  async getCurrentUser() {
    const ret = await Storage.get({ key: 'currentUsers' });
    const user = JSON.parse(ret.value);
  }

  async logout(){
    await Storage.remove({ key: 'currentUsers' });
    this.router.navigate(['../account']);
  }


}
