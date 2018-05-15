import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  user: User;

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login',{
      username: username,
      password: password
    }).pipe(tap(user => {
      this.user = user as User;
      return user;
    }));
  }

  logout(): Observable<any> {
    this.user = undefined;
    return of(null);
  }

  getUser(): User {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.user != undefined;
  }

}
