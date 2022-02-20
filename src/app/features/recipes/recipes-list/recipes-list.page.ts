import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Recipe } from 'src/app/common/interfaces/recipes';
import { User } from 'src/app/common/interfaces/user';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { RecipesService } from 'src/app/common/services/recipes/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesListPage implements OnInit{
  recipes: Recipe[];
  loading: boolean = false;
  user: User;
  
  constructor(
    private recipesService: RecipesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.user
      .subscribe(user => this.user = user);
  }

  ionViewWillEnter() {
    this.getAllRecipes();
  }

  private getAllRecipes() {
    this.loading = true;
    this.recipesService.getAllRecipes()
      .pipe(delay(500))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
        this.loading = false;
      });
  }

}
