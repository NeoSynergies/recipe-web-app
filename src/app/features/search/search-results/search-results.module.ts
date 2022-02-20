import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchResultsPageRoutingModule } from './search-results-routing.module';

import { SearchResultsPage } from './search-results.page';
import { RecipeModule } from 'src/app/common/components/boxes/recipe/recipe.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchResultsPageRoutingModule,
    RecipeModule,
    SharedModule
  ],
  declarations: [SearchResultsPage]
})
export class SearchResultsPageModule {}
