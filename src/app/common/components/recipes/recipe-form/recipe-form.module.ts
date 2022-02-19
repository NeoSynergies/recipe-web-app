import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecipeFormComponent } from './recipe-form.component';



@NgModule({
  declarations: [RecipeFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    RecipeFormComponent
  ]
})
export class RecipeFormModule { }
