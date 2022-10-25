import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  users: any[];
  apiUrl: string;
  public user: Observable<User>;

  constructor(private http: HttpClient) {
   }

  login(email: string, password: string){
    console.log(email, password);

  }

  addUser(userD: User) {
      return this.http.post(`/account/register`, userD);
      console.log(userD);
  }

  getAll() {
    return this.http.get<User[]>(`/home`);
  }


}
