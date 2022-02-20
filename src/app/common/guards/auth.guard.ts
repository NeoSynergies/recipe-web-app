import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user
      .pipe(
        take(1),
        switchMap(user => { // we return true or false depending if user is authenticated
          if (this.authService.getIfUserIsAuthenticated()) return of(true)
          else return of(false);
        }),
        tap(isUser => { // we navigate to recipes if there is no user
          if (!isUser) this.router.navigate(['/recipes']);
        })
      );
  }
}
