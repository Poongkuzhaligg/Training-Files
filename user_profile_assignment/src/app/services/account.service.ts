import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    apiUrl: string;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.apiUrl = environment.apiUrl;
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username, password) {
        //TODO post apiurl/users/authenticate with body object as {
         //   username: username,
          //  password: password
       // }
       //map and set user to local storage and call usersubject with that user fwd the response
    }

    logout() {
        // TODO: remove user from local storage and set current user to null and navigate to login
    }

    register(user: User): any {
        //TODO post apiurl/users/register with body object as user
    }

    getAll(): any {
        //TODO get apiurl/users and return
    }

    getById(id: string): any {
        //TODO get apiurl/users/id and return
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}
