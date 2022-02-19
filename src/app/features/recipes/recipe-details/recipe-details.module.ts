import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeDetailsPage } from './recipe-details.page';
import { RecipeDetailsPageRoutingModule } from './recipe-details-routing.module';
import { AddToShoppingListComponent } from 'src/app/common/components/add-to-shopping-list/add-to-shopping-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeDetailsPageRoutingModule,
    
  ],
  declarations: [RecipeDetailsPage, AddToShoppingListComponent]
})
export class RecipeDetailsPageModule {}
