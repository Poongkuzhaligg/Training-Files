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
    private router: Router,
    private alertController: AlertController) {
    this.getUser();
  }

  async loggedUser(){
    const userResult = await Storage.get({key: 'currentUsers'});
    return JSON.parse(userResult.value);
  }

  login(email: string, passwordIn: string){
    const emailId = this.users.find( user => user.email === email);
    const password = this.users.find( user => user.password === passwordIn);
    if(emailId === undefined  ){
      this.presentAlert('Email does not exist, Kindly register!');
      return;
    }
    else if(password === undefined){
      this.presentAlert('Password does not match, Try again!');
      return;
    }
    else if(emailId === undefined && password === undefined){
      this.presentAlert('Not registered!');
      return;
    }
    this.router.navigate(['../home']);
    this.setCurrentUser(emailId);
  }

  async editForm(username: string, password: string){
      const cUser = await this.loggedUser();
      let allUsers: User[] = [];
      const ret = await Storage.get({ key: 'users' });
      const user = JSON.parse(ret.value);
      allUsers = [allUsers, ...user];
      await Storage.remove({ key: 'users' });
      const editUser = allUsers.find( u => u.email === cUser.email);
      editUser.username = username;
      editUser.password = password;
      console.log(editUser);
      const index = allUsers.indexOf(editUser);
      allUsers.splice(index, 1);
      allUsers.push(editUser);
      this.users = allUsers;
      await this.setUser();
  }

  async registerUser(userDetails: User) {
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
    this.setCurrentUser(userDetails);
    this.router.navigate(['../home']);
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

  async setCurrentUser(loggedUser): Promise<void> {
    await Storage.set({
      key: 'currentUsers',
      value: JSON.stringify(loggedUser)
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
