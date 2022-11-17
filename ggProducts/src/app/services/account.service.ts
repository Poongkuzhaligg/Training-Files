import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../model/account-model';
import { STORAGE_KEY } from '../config/storage-key';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  users: User[] = [];
  currentUser: User;
  currrentUsername: BehaviorSubject<string> = new BehaviorSubject(null);

  private readonly currentUserKey = STORAGE_KEY.currentUser;

  constructor(
    private router: Router,
    private http: HttpClient,) {
    // this.getUser();
  }

  async loggedUser() {
    const userResult = await Storage.get({ key: this.currentUserKey });
    this.currentUser = JSON.parse(userResult.value);
    this.currrentUsername.next(this.currentUser.username);
    return this.currentUser;
  }


  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + `login`, { email, password }, { withCredentials: true });
  }

  registerUser(userDetails: User): Observable<any> {
    return this.http.post(environment.apiUrl + 'users/register', { userDetails }, { withCredentials: true });
  }

  editForm(username: string, password: string) {
    return this.http.put(environment.apiUrl + 'users/editProfile', { username, password });
  }

  async setCurrentUser(loggedUser): Promise<void> {
    await Storage.set({
      key: this.currentUserKey,
      value: JSON.stringify(loggedUser)
    });
    this.currrentUsername.next(loggedUser.username);
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

  async logout() {
    this.http.post(environment.apiUrl + 'login/logout', { withCredentials: true }).subscribe(res => { console.log(res); });
    await Storage.remove({ key: this.currentUserKey });
    this.router.navigate(['../account']);
  }

}
