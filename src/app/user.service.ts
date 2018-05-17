import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login',{
      username: username,
      password: password
    }).pipe(tap(user => {
      localStorage.setItem('user',JSON.stringify(user));
      return Object.assign(new User(), user);
    }));
  }

  logout(): Observable<any> {
    localStorage.removeItem('user');
    return of(null);
  }

  getUser(): User {
    const u = JSON.parse(localStorage.getItem('user'));
    return Object.assign(new User(),u);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  getToken(): string {
    return this.getUser().token;
  }

}
