import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { RecipeIngredient } from '../../interfaces/recipes';
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
      .pipe(
        switchMap((user) => {
          if (user) {
            this.user = user;
            return this.getUserIngredients();
          }
          return of([]);
        })
      )
      .subscribe((ingredients: any) => {
        console.log('the ingredients EEEEEE');
        console.log(ingredients);
        
        this.shoppingListElements.next(ingredients.ingredients)
      });
  }

  getUserIngredients(): Observable<RecipeIngredient[]> {
    return this.http.get<RecipeIngredient[]>('http://localhost:3000/ingredients/' + this.user.id);
  }

  // WE WILL substitute the whole USER object because I don't know if i can create new endpoints
  addElementToShoppingList(values: any, category: string): Observable<any> {
    values = {
      id: values.id ? values.id : this.generateId(), // we assign the id if the element have it and if not we generate one
      category: category,
      ...values,
    };

    const ingredients = [...this.shoppingListElements.getValue(), values];
    this.shoppingListElements.next(ingredients);

    const dbObjectToSubstitute = {
      id: this.user.id,
      ingredients
    }
    // we update the local shopping list
    return this.substituteDbObject(dbObjectToSubstitute);

  }

  deleteShoppingListElements(values: any): Observable<any> {

    const ingredients = this.shoppingListElements.getValue().filter(ingredient => ingredient.id !== values.id);
    const dbObjectToSubstitute = {
      id: this.user.id,
      ingredients
    }

    this.shoppingListElements.next(ingredients);

    return this.substituteDbObject(dbObjectToSubstitute);
  }

  substituteDbObject(object) {
    // we update the server shopping list
    return this.http.put('http://localhost:3000/ingredients/'+ this.user.id, object)
      .pipe(
        catchError(() => this.errorHandlingService.returnErrorAndShowModal('There was an error with the server'))
      );
  }

  // id generator function, if we would need this in more places, we should create a public service
  private generateId(): string {
    return Math.random().toString(36).substr(2, 16); 
  }
}
