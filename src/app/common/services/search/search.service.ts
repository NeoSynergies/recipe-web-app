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
    // this wouldn't be like this in a real project
    // because we would have an endpoint to do this query
    // but to not touch the backend so much we do it this way
    return zip(this.shoppingListService.shoppingListElements, this.recipesService.getAllRecipes())
      .pipe(
        catchError(() => this.errorHandlingService.returnErrorAndShowModal('There was an error searching')),
        map((result) => {
          // we filter the ingredients and recipes by the term
          const ingredients = result[0].filter(element => this.regexString(element.label).includes(term));
          const recipes = result[1].filter(element => this.regexString(element.title).includes(term));

          const thereAreResults = ingredients.length > 0 || recipes.length > 0; // we check if there are results

          const filteredResults = { // we create the object to return
            ingredients,
            recipes,
            thereAreResults
          };

          return filteredResults;
        })
      );
  }

  // this function delete commas, dots, and set all the characters to lower case
  private regexString(text: string): string {
    return text.replace(/[^A-Za-z0-9\s!?]/g,'').toLowerCase();
  }
}
