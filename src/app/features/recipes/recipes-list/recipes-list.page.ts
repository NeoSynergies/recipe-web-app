import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/common/interfaces/recipes';
import { RecipesService } from 'src/app/common/services/recipes/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesListPage implements OnInit {
  recipes: Recipe[];
  constructor(
    private recipesService: RecipesService
  ) { }

  ngOnInit() {
    this.getAllRecipes();
  }

  private getAllRecipes() {
    this.recipesService.getAllRecipes()
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  onSeeRecipeDetails(recipeId: string) {

  }

}
