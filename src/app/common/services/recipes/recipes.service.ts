import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../../interfaces/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  // we will go to an easy implementation for a small application, but for a bigger one we should use NgRX for state management
  constructor(
    private http: HttpClient
  ) { }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('http://localhost:3000/recipes');
  }

  addRecipe() {

  }

  updateRecipe() {

  }

  deleteRecipe() {

  }

}
