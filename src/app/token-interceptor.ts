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

  constructor(private inj: Injector) {}

  intercept(
      request: HttpRequest<any>, 
      next: HttpHandler): Observable<HttpEvent<any>> {
    const us = this.inj.get(UserService);
    if (us.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${us.getToken()}`
        }
      });
    }
    return next.handle(request).pipe( tap(() => {},
    (err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status !== 401) {
       return;
      }
      us.deauthLogout();
    }
  }));
  }
}