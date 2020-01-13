import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './user';
import { Observable ,  of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const TOKEN_CHECK_INTERVAL_MS = 1000*60; //1 minute
const TOKEN_REFRESH_THRESHOLD_S = 60*60*12; //12 hours

@Injectable()
export class UserService {

  tokenWatchdog;
  token;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { 
    //Grab the user every minute, to confirm it's still valid
    //If invalid, it will log them out automatically
    //If the token is about to expire, then it will be refreshed
    this.checkStatus();
    this.tokenWatchdog = setInterval(this.checkStatus,TOKEN_CHECK_INTERVAL_MS);
  }

  checkStatus() {
    if (!this.token) return;
    const exp = this.token.exp;
    const now = new Date().getTime()/1000;
    const rem = exp-now;

    //console.log(`user time remaining: ${rem}`)

    if (rem <= TOKEN_REFRESH_THRESHOLD_S) {
      console.log("refreshing token")
      this.refresh().subscribe();
    } else if (rem <= 0) {
      console.log('user exipred %s <= %s',this.token.exp,new Date().getTime());
      this.deauthLogout();
      return null;
    }
  }

  deauthLogout() {
    this.logout();
    this.snackBar.open("Logged out due to inactivity, please log in again.",null,{
      duration: 5000,
    });
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>('/api/auth/login',{
      username,password
    }).pipe(tap(user => {
      this.token = jwt_decode(user.token);
      localStorage.setItem('user',JSON.stringify(user));
      return Object.assign(new User(), user);
    }));
  }

  refresh() {
    return this.http.post<User>('/api/auth/refresh',{})
    .pipe(tap(user => {
      this.token = jwt_decode(user.token);
      localStorage.setItem('user',JSON.stringify(user));
      return Object.assign(new User(), user);
    }));
  }

  register(username: string, password: string, email: string): Observable<User> {
    return this.http.post<User>('/api/users',{
      username,password,email
    }).pipe(tap(user => {
      this.token = jwt_decode(user.token);
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

    if (user && !this.token) {
      this.token = jwt_decode(user.token);
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
