import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShoppingListPopoverComponent } from './shopping-list-popover/shopping-list-popover.component';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ShoppingListPopoverComponent, HeaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
