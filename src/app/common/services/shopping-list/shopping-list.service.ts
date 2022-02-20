import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../interfaces/user';
import { AuthService } from '../auth/auth.service';
import { ErrorHandlingService } from '../error/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{
  shoppingListElements: BehaviorSubject<any> = new BehaviorSubject([]);
  user: User;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private errorHandlingService: ErrorHandlingService
  ) {
    this.authService.user
      .subscribe(user => {
        // just execute the getShopping function when there is the user object
        if (Object.keys(user).length !== 0) {
          this.user = user;
          // spread operator here prevents same instance problems when pushing values
          this.shoppingListElements.next([...user.ingredients]);
        }
      });
  }

  // WE WILL substitute the whole USER object because I don't know if i can create new endpoints
  addElementToShoppingList(values: any, category: string): Observable<any> {
    values = {
      id: values.id ? values.id : this.generateId(), // we assign the id if the element have it and if not we generate one
      category: category,
      ...values,
    };

    this.user.ingredients.push(values);
    return this.substituteUserAndGetIngredients();
  }

  deleteShoppingListElements(values: any): Observable<any> {
    this.user.ingredients = this.user.ingredients.filter(ingredient => ingredient.id !== values.id);
    return this.substituteUserAndGetIngredients();
  }

  substituteUserAndGetIngredients(): Observable<any> {
    return this.http.put('http://localhost:3000/users/'+ this.user.id, this.user)
      .pipe(
        catchError(() => this.errorHandlingService.returnErrorAndShowModal('There was an error with the server')),
        tap(
          () => this.shoppingListElements.next(this.user.ingredients),
          (err) => {
            console.log('El error');
            console.log(err);
            // ERROR HANDLING
          }
        )
      );
  }

  // id generator function, if we would need this in more places, we should create a public service
  private generateId(): string {
    return Math.random().toString(36).substr(2, 16); 
  }
}
