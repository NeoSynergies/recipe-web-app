import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private http: HttpClient
  ) { }

  getUser() {
    this.http.get('http://localhost:3000/users/aijsndiusad')
      .subscribe((user: User) => {
        this.user.next(user);
      });
  }
}
