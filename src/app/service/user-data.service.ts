import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { ReplaySubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  user: User;

  public userChange: ReplaySubject<User> = new ReplaySubject(1);

  constructor() { }

  deauthLogout() {
    this.logout();
  }

  logout(): Observable<any> {
    return of(this.setUser(null));
  }

  getUser(): User {
    if (this.user !== null) this.user;

    if (localStorage.getItem('user') !== null) {
      const uj = JSON.parse(localStorage.getItem('user'));
      this.user = Object.assign(new User(), uj);
      return this.user;
    }

    return null;
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

  updateToken(token: string) {
    if (this.user) {
      this.user.token = token;
      this.userChange.next(this.user);
    }
  }
}
