import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string = null;

  user$ = new BehaviorSubject<User>(new User());

  get token(): string {
    if(this._token) return this._token;
    else if (this.getTokenFromStorage()) {
      this.token = this.getTokenFromStorage();
      return this.getTokenFromStorage();
    }
    else return null;
  }

  set token(value: string) {
    this._token = value;
  }

  setTokenToStorage(token: string): void {
    localStorage.setItem('token', token);
  }

  getTokenFromStorage(): string {
    if(localStorage.getItem('token')) {
      return localStorage.getItem('token')
    } else return null;
  }

  logOut(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.user$.next(new User());
  }

}