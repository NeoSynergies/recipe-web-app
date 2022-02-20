import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/interfaces/user';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { RecipesService } from 'src/app/common/services/recipes/recipes.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage implements OnInit {
  user: User;
  constructor(
    private authService: AuthService,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user
      .subscribe(user => this.user = user);
  }

  onSubmitRecipe(event: any) {
    this.recipesService.addOrUpdateRecipe(event)
      .subscribe(() => {
        this.router.navigate(['/recipes/']);
      });
  }
}
