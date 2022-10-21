import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl: string;
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
   }

  login(email, password){
    return this.http.post(
      environment.apiUrl, {
        email,
        password
      }
    ).pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      // this.userSubject.next());
    }));
  }

  register(user: User): any {
    //TODO post apiurl/users/register with body object as user
    // this.addUser(user);
    return this.http.post<User>(`${environment.apiUrl}`,
    user);
  }

  // addUser(user: User) {
  //   let users = [];


  // }


}
