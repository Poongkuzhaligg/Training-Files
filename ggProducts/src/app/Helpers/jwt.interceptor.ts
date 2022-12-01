import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountServ: AccountService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = this.accountServ.currrentToken.value;
    const isApiUrl = req.url.startsWith(environment.apiUrl);
    if (userToken && isApiUrl) {
      req = req.clone({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `authorization` + userToken
        }
      });
    }
    return next.handle(req)
      .pipe(
        catchError(x => this.tokenError(x)));

  }


  tokenError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 400) {
      this.router.navigate(['./account']);
    }
    throw Error;
  }
}
