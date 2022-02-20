import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Recipe } from '../../interfaces/recipes';
import { ErrorHandlingService } from '../error/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  // we will go to an easy implementation for a small application, but for a bigger one we should use NgRX for state management
  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('http://localhost:3000/recipes')
      .pipe(
        catchError(() => this.errorHandlingService.returnErrorAndShowModal('There was an error loading the recipes'))
      );
  }

  getOneRecipe(recipeId: string): Observable<Recipe> {
    return this.http.get<Recipe>('http://localhost:3000/recipes/' + recipeId)
      .pipe(
        catchError(() => this.errorHandlingService.returnErrorAndShowModal('We couldn\'t load the recipe'))
      );
  }

  addRecipe(recipe: any): Observable<any> {
    if (!recipe.id) recipe.id = this.generateId();
    // we change the url to show real pics because we don't implement image upload in the backedn
    recipe.imageUrl = '/assets/dummy.jpg';
    return this.http.put('http://localhost:3000/recipes/' + recipe.id, recipe)  
      .pipe(
        catchError(() => this.errorHandlingService.returnErrorAndShowModal('There was an error creating the recipe'))
      );
  }

  updateRecipe(recipe: any): Observable<any> {
    // we delete the recipe
    return this.http.delete('http://localhost:3000/recipes/' + recipe.id)
      .pipe(
        catchError(() => this.errorHandlingService.returnErrorAndShowModal('There was an error updating the recipe')),
        switchMap(() => {
          // we add it again
          return this.addRecipe(recipe)
        })
      );
  }

  deleteRecipe(recipeId): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/recipes/' + recipeId)
      .pipe(
        catchError(() => this.errorHandlingService.returnErrorAndShowModal('There was an error deleting the recipe')),
      );
  }

  // id generator function, if we would need this in more places, we should create a public service
  private generateId(): string {
    return Math.random().toString(36).substr(2, 16); 
  }

}
