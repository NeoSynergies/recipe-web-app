import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<any> = new BehaviorSubject(null);
  userIsAuthenticated: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  getUser() {
    this.http.get('http://localhost:3000/users/aijsndiusads')
      .pipe(
        map(user => Object.keys(user).length === 0 ? null : user)
      )
      .subscribe((user: User) => {
        if (user) {
          this.user.next(user);
          this.userIsAuthenticated = true;
        } else {
          this.userIsAuthenticated = false;
        }
      });
  }

  getIfUserIsAuthenticated(): boolean {return this.userIsAuthenticated}
}
