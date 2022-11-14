import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../model/account-model';
import { STORAGE_KEY } from '../config/storage-key';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  users: User[] = [];
  status: AuthResponse;

  private readonly currentUserKey = STORAGE_KEY.currentUser;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private http: HttpClient,) {
    // this.getUser();
  }

  async loggedUser() {
    const userResult = await Storage.get({ key: this.currentUserKey });
    return JSON.parse(userResult.value);
  }


  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + `login`, { email, password }, { withCredentials: true });
  }

  registerUser(userDetails: User): Observable<any> {
    return this.http.post(environment.apiUrl + 'users/register', { userDetails }, { withCredentials: true });
  }

  async editForm(username: string, password: string) {

  }

  async setCurrentUser(loggedUser): Promise<void> {
    await Storage.set({
      key: this.currentUserKey,
      value: JSON.stringify(loggedUser)
    });
  }

  // async getUser() {
  //   const deviceStatus: boolean = navigator.onLine;
  //   if (deviceStatus === true) {
  //     this.http.get(environment.apiUrl + 'users').subscribe((result: User) => {
  //       this.users = this.users.concat(result);
  //       console.log(this.users);
  //     });
  //   }
  // }


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'ALERT',
      subHeader: 'Data Invalid!',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentToast(messageIn: string, colorIn: string) {
    const toast = await this.toastController.create({
      message: messageIn,
      duration: 2000,
      position: 'top',
      color: colorIn
    });
    await toast.present();
  }


  async logout() {
    await Storage.remove({ key: this.currentUserKey });
    this.router.navigate(['../account']);
  }

}
