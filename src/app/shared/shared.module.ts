import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
