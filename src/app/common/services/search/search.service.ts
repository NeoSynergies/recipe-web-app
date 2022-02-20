import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RecipesService } from '../recipes/recipes.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private shoppingListService: ShoppingListService,
    private recipesService: RecipesService
  ) { }

  globalSearch(term: string): Observable<any> {
    return zip(this.shoppingListService.shoppingListElements, this.recipesService.getAllRecipes())
      .pipe(
        map((result) => {
          return {
            ingredients: result[0],
            recipes: result[1]
          }
        })
      );
  }
}
