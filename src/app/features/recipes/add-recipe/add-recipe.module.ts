import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { AddRecipePage } from './add-recipe.page';
import { AddRecipePageRoutingModule } from './add-recipe-routing.module';
import { RecipeFormComponent } from 'src/app/common/components/recipes/recipe-form/recipe-form.component';
import { RecipeFormModule } from 'src/app/common/components/recipes/recipe-form/recipe-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRecipePageRoutingModule,
    ReactiveFormsModule,
    RecipeFormModule
  ],
  declarations: [AddRecipePage]
})
export class AddRecipePageModule {}
