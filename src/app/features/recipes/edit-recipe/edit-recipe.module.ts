import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRecipePage } from './edit-recipe.page';
import { RecipeFormComponent } from 'src/app/common/components/recipes/recipe-form/recipe-form.component';
import { RecipeFormModule } from 'src/app/common/components/recipes/recipe-form/recipe-form.module';
import { EditRecipePageRoutingModule } from './edit-recipe-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeFormModule,
    EditRecipePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditRecipePage]
})
export class EditRecipePageModule {}
