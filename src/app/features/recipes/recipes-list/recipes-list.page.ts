import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Recipe } from 'src/app/common/interfaces/recipes';
import { RecipesService } from 'src/app/common/services/recipes/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesListPage {
  recipes: Recipe[];
  loading: boolean = false;

  constructor(
    private recipesService: RecipesService
  ) { }

  ionViewWillEnter() {
    this.getAllRecipes();
  }

  private getAllRecipes() {
    this.loading = true;
    this.recipesService.getAllRecipes()
      .pipe(delay(1000))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
        this.loading = false;
      });
  }

  onSeeRecipeDetails(recipeId: string) {

  }

}
