import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../model/account-model';
import { STORAGE_KEY } from '../config/storage-key';
import { BehaviorSubject, Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  users: User[] = [];
  currentUser;
  currrentProfile: BehaviorSubject<User> = new BehaviorSubject(null);
  currrentToken: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private http: HttpClient) {
  }

  async loggedUser() {
    const userResult = await Storage.get({ key: STORAGE_KEY.currentUser });
    this.currentUser = JSON.parse(userResult.value);
    this.currrentProfile.next(this.currentUser);
    return this.currentUser;
  }


  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + `user/login`, { email, password }, { withCredentials: true });
  }

  registerUser(firstname, lastname, email, password): Observable<any> {
    return this.http.post(environment.apiUrl + 'users/register',
      { firstname, lastname, email, password },
      { withCredentials: true });
  }

  editForm(firstname: string, lastname: string, email: string) {
    return this.http.put(environment.apiUrl + 'users/editProfile', { firstname, lastname, email });
  }

  changePassword(password: string) {
    return this.http.put(environment.apiUrl + 'users/changePassword', { password });
  }

  async setCurrentUser(loggedUser): Promise<void> {
    await Storage.set({
      key: STORAGE_KEY.currentUser,
      value: JSON.stringify(loggedUser)
    });
    this.currrentProfile.next(loggedUser);
  }

  async setUserToken(userToken: string): Promise<void> {
    await Storage.set({
      key: STORAGE_KEY.userToken,
      value: JSON.stringify(userToken)
    });
  }

  async logout() {
    this.http.post(environment.apiUrl + 'user/logout', { withCredentials: true }).subscribe();
    await Storage.remove({ key: STORAGE_KEY.currentUser });
    this.router.navigate(['/account']);
  }

}
