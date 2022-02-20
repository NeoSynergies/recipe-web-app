import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesListPageRoutingModule } from './recipes-list-routing.module';

import { RecipesListPage } from './recipes-list.page';
import { RouterModule } from '@angular/router';
import { RecipeModule } from 'src/app/common/components/boxes/recipe/recipe.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipesListPageRoutingModule,
    RouterModule,
    RecipeModule
  ],
  declarations: [RecipesListPage]
})
export class RecipesListPageModule {}
