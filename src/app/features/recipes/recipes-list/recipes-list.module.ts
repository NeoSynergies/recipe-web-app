import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesListPageRoutingModule } from './recipes-list-routing.module';

import { RecipesListPage } from './recipes-list.page';
import { RouterModule } from '@angular/router';
import { RecipeModule } from 'src/app/common/components/boxes/recipe/recipe.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipesListPageRoutingModule,
    RouterModule,
    RecipeModule,
    SharedModule
  ],
  declarations: [RecipesListPage]
})
export class RecipesListPageModule {}
