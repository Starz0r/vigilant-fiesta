import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './user';
import { Observable ,  of, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
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

  user: User;

  public userChange: ReplaySubject<User> = new ReplaySubject(1);

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { 
    //Grab the user every minute, to confirm it's still valid
    //If invalid, it will log them out automatically
    //If the token is about to expire, then it will be refreshed
    this.checkStatus();
    this.tokenWatchdog = setInterval(()=>this.checkStatus(),TOKEN_CHECK_INTERVAL_MS);
    this.userChange.next(this.getUser());
  }

  checkStatus() {
    this.getUser();
    if (!this.user) return;
    const token = jwt_decode(this.user.token);

    const exp = token.exp;
    const now = new Date().getTime()/1000;
    const rem = exp-now;

    //console.log(`user time remaining: ${rem}`)

    if (rem <= TOKEN_REFRESH_THRESHOLD_S) {
      console.log("refreshing token")
      this.refresh().subscribe();
    } else if (rem <= 0) {
      console.log('user exipred %s <= %s',token.exp,new Date().getTime());
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
    }).pipe(tap(user => this.setUser(user)));
  }

  refresh() {
    return this.http.post<User>('/api/auth/refresh',{})
    .pipe(tap(user => this.setUser(user)));
  }

  register(username: string, password: string, email: string): Observable<User> {
    return this.http.post<User>('/api/users',{
      username,password,email
    }).pipe(tap(user => this.setUser(user)));
  }

  setUser(user: any) {
    if (!!user) {
      user = Object.assign(new User(), user);
      localStorage.setItem('user',JSON.stringify(user));
    }
    else localStorage.removeItem('user');
    this.user = user
    this.userChange.next(user);
    return user;
  }

  logout(): Observable<any> {
    return of(this.setUser(null));
  }

  private getUser(): User {
    if (this.user !== null) this.user;

    if (localStorage.getItem('user') !== null) {
      const uj = JSON.parse(localStorage.getItem('user'));
      this.user = Object.assign(new User(), uj);
      return this.user;
    }

    return null;
  }

  updateToken(token: string) {
    if (this.user) {
      this.user.token = token;
      this.userChange.next(this.user);
    }
  }

  requestReset(username: string, email: string): Observable<any> {
    return this.http.post<User>('/api/auth/request-reset',{
      username,email
    }).pipe(tap(user => this.setUser(user)));
  }

  resetPassword(username: string, token: string, password: string): Observable<any> {
    return this.http.post<User>('/api/auth/reset',{
      username,password,token
    }).pipe(tap(user => this.setUser(user)));
  }
}
