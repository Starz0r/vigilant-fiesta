import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token: string = "";
  us: UserService;

  constructor(private inj: Injector) {
    this.us = this.inj.get(UserService);
    this.us.userChange.subscribe(user => this.token == (!!user?user.token:null));
  }

  intercept(
      request: HttpRequest<any>, 
      next: HttpHandler): Observable<HttpEvent<any>> {
    if (!!this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }
    return next.handle(request).pipe( tap(() => {},
    (err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status !== 401) {
       return;
      }
      this.us.deauthLogout();
    }
  }));
  }
}