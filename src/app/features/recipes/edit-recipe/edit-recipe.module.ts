import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRecipePage } from './edit-recipe.page';
import { RecipeFormComponent } from 'src/app/common/components/recipes/recipe-form/recipe-form.component';
import { RecipeFormModule } from 'src/app/common/components/recipes/recipe-form/recipe-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeFormModule
  ],
  declarations: [EditRecipePage]
})
export class EditRecipePageModule {}
