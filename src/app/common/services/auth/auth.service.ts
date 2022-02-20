import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../interfaces/user';
import { ErrorHandlingService } from '../error/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<any> = new BehaviorSubject(null);
  userIsAuthenticated: boolean = false;

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  getUser() {
    this.http.get('http://localhost:3000/users/aijsndiusads')
      .pipe(
        catchError(() => this.errorHandlingService.returnErrorAndShowModal('We couldn\'t load the user')),
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
