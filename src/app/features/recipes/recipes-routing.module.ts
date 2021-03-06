import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/common/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes-list',
    pathMatch: 'full'
  },
  {
    path: 'recipes-list',
    loadChildren: () => import('./recipes-list/recipes-list.module').then( m => m.RecipesListPageModule)
  },
  {
    path: 'add-recipe',
    loadChildren: () => import('./add-recipe/add-recipe.module').then( m => m.AddRecipePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'edit-recipe',
    loadChildren: () => import('./edit-recipe/edit-recipe.module').then( m => m.EditRecipePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'recipe/:recipeId',
    loadChildren: () => import('./recipe-details/recipe-details.module').then( m => m.RecipeDetailsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
