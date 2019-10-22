import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn = new BehaviorSubject<any>(this.getUser);

  constructor(
    private http: HttpClient
  ) { }

  get watchUser() {
    return this.isUserLoggedIn.asObservable();
  }

  set setUser(data) {
    localStorage.setItem('login', JSON.stringify(data));
  }

  get getUser() {
    return JSON.parse(localStorage.getItem('login'));
  }

  /**
   * Login a user
   */
  login = (user: User) => {
    return this.http.post(`${environment.apiDomain}/login`, user);
  }

  /**
   * Logout a user
   */
  logOut = () => {
    localStorage.removeItem('login');
    this.isUserLoggedIn.next(null);
  }
}
