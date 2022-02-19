import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { AddRecipePage } from './add-recipe.page';
import { AddRecipePageRoutingModule } from './add-recipe-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRecipePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddRecipePage]
})
export class AddRecipePageModule {}
