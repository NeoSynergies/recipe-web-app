import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/interfaces/user';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { RecipesService } from 'src/app/common/services/recipes/recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
  user: User;
  recipe;
  constructor(
    private authService: AuthService,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user
      .subscribe(user => {
        this.user = user;
        this.recipe = history.state.recipe;
      });
  }

  onSubmitRecipe(event: any): void {
    this.recipesService.addOrUpdateRecipe(event)
      .subscribe(() => {
        this.router.navigate(['/recipes/']);
      });
  }

}
