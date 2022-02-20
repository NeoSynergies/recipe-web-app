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
      .subscribe((ingredients: any) => this.shoppingListElements.next(ingredients.ingredients || []));
  }

  public getUserIngredients(): Observable<RecipeIngredient[]> {
    return this.http.get<RecipeIngredient[]>('http://localhost:3000/ingredients/' + this.user.id)
      .pipe(
        catchError(() => this.errorHandlingService.returnErrorAndShowModal('There was an error getting user ingredients'))
      );
  }

  // WE WILL substitute the whole USER object because I didn't knew if i could create new endpoints
  public addElementToShoppingList(values: any, category: string): Observable<any> {
    // we create a new ingredient
    const newIngredient = {
      id: values.id ? values.id : this.generateId(), // we assign the id if the element have it and if not we generate one
      category: category,
      ...values,
    };

    // we generate another array with the current shoppingListElements and the new ingredient
    const ingredients = [...this.shoppingListElements.getValue(), newIngredient];

    // update local ingredients
    this.shoppingListElements.next(ingredients);

    // update db ingredients
    const dbObjectToReplace = {
      id: this.user.id,
      ingredients
    }
    return this.replaceDbIngredients(dbObjectToReplace);
  }

  public deleteShoppingListElements(values: any): Observable<any> {
    // we remove the ingredient from the shoppingListElements value
    const ingredients = this.shoppingListElements.getValue().filter(ingredient => ingredient.id !== values.id);

    // update local ingredients
    this.shoppingListElements.next(ingredients);

    // update db ingredients
    const dbObjectToReplace = {
      id: this.user.id,
      ingredients
    }
    return this.replaceDbIngredients(dbObjectToReplace);
  }

  private replaceDbIngredients(object): Observable<any> {
    // we replace the server shopping list
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
