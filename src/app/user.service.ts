import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './user';
import { Observable ,  of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
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
    const user = Object.assign(new User(),u);
    const token = jwt_decode(user.token);
    if (token.exp <= (new Date().getTime()/1000)) {
      console.log('user exipred %s <= %s',token.exp,new Date().getTime());
      this.logout();
      return null;
    }
    return user;
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('user') === null) return false;
    else return this.getUser() !== null;
  }

  getToken(): string {
    if (!this.isLoggedIn()) return null;
    return this.getUser().token;
  }

}
