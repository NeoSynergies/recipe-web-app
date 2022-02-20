import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../interfaces/user';
import { ErrorHandlingService } from '../error/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  getUser() {
    this.http.get('http://localhost:3000/users/ss')
      .pipe(
        catchError(() => this.errorHandlingService.returnErrorAndShowModal('We couldn\'t load the user'))
      )
      .subscribe((user: User) => {
        this.user.next(user);
      });
  }
}
