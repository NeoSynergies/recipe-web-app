import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ErrorHandlingService } from '../error/error-handling.service';
import { RecipesService } from '../recipes/recipes.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private shoppingListService: ShoppingListService,
    private recipesService: RecipesService,
    private errorHandlingService: ErrorHandlingService
  ) { }

  globalSearch(term: string): Observable<any> {
    return zip(this.shoppingListService.shoppingListElements, this.recipesService.getAllRecipes())
      .pipe(
        catchError(() => this.errorHandlingService.returnErrorAndShowModal('There was an error searching')),
        map((result) => {
          return {
            ingredients: result[0],
            recipes: result[1]
          }
        })
      );
  }
}
