import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Recipe } from 'src/app/common/interfaces/recipes';
import { User } from 'src/app/common/interfaces/user';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { RecipesService } from 'src/app/common/services/recipes/recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
  user: User;
  recipe: Recipe;
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private authService: AuthService,
    private router: Router
  ) { }

  // geting here again one recipe is redundant because we got them in the recipes list, but
  // in a bigger app we wouldn't get a the recipes with all the data because it would be useless as we just show some properties, not all the object
  ngOnInit() {
    this.authService.user
      .subscribe(user => {
        this.user = user;
      });

    this.route.params
      .pipe(
        switchMap((params) => {
          return this.recipesService.getOneRecipe(params.recipeId);
        })
      )
      .subscribe((recipe: Recipe) => this.recipe = recipe);
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.recipe.id)
      .subscribe(() => {
        this.router.navigate(['/recipes/']);
      });
  }

}
