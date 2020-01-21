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
import { User } from './user';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  user: User;
  us: UserService;

  constructor(private inj: Injector) {
    this.us = this.inj.get(UserService);
    this.us.userChange.subscribe(user => this.user = user);
  }

  intercept(
      request: HttpRequest<any>, 
      next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.user.token}`
        }
      });
    }
    return next.handle(request).pipe( tap(() => {},
    (err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status !== 401) {
       return;
      }
      if (this.user) this.us.deauthLogout();
    }
  }));
  }
}