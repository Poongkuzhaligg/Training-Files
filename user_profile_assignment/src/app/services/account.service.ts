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
        // this.apiUrl = environment.FirebaseApiUrl;
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
       return this.http.post<User>(
           'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.FirebaseApiUrl+'/users/authenticate',
            {
                username: username,
                password: password
            }      
       ).pipe(map(user => {
           localStorage.setItem('user', JSON.stringify(user));
           this.userSubject.next(user);
           return user;
       }))

       //map and set user to local storage and call usersubject with that user fwd the response
    }

    logout() {
        // TODO: remove user from local storage and set current user to null and navigate to login
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
        localStorage.removeItem('user')
    }

    register(user: User): any {
        //TODO post apiurl/users/register with body object as user
        return this.http.post<User>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.FirebaseApiUrl+'/users/register',
        user);
    }

    getAll(): any {
        //TODO get apiurl/users and return
        return this.http.get<User>('https://userdetails-b2352-default-rtdb.firebaseio.com/user.json');
    }

    getById(id: string): any {
        //TODO get apiurl/users/id and return
    }

    update(id, params) {
        return this.http.put('https://userdetails-b2352-default-rtdb.firebaseio.com/user.json'+environment.FirebaseApiUrl+`/users/${id}`, params)
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
        return this.http.delete(environment.FirebaseApiUrl+`/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}
