import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs/operators';
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
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private authService: AuthService,
    private router: Router
  ) { }

  // geting here again one recipe is redundant because we got them in the recipes list, but
  // in a bigger app we wouldn't get a the recipes with all the data because it would be useless as we just show some properties, not all the object
  ngOnInit() {
    this.loading = true;
    this.authService.user
      .pipe(
        delay(1000),
        tap(user => this.user = user), // we set the user
        switchMap(() => {
          return this.route.params; // we get the params
        }),
        switchMap((params) => {
          return this.recipesService.getOneRecipe(params.recipeId); // we get the recipe
        })
      )
      .subscribe((recipe: Recipe) => {this.recipe = recipe; this.loading = false;});
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.recipe.id)
      .subscribe(() => {
        this.router.navigate(['/recipes/']);
      });
  }

  onEditRecipe() {
    this.router.navigate(['/recipes/edit-recipe'], {
      state: {
        recipe: this.recipe
      }
    });
  }

}
