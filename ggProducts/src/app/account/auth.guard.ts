import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../services/account.service';
// import { BackendAccountService } from '../services/backendAccount.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountServ: AccountService, private router: Router){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const currentUser = await this.accountServ.loggedUser();
    if(currentUser){
      return true;
    }
    this.router.navigate(['./account']);
    return false;

  }
}
