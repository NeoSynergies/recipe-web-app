import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { ShoppingListPopoverComponent } from './shopping-list-popover/shopping-list-popover.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  shoppingListElements = [];
  constructor(
    private shoppingListService: ShoppingListService,
    public popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.shoppingListService.shoppingListElements
      .subscribe(elements => {
        console.log('SUSCRITO');
        console.log(elements);
        
        this.shoppingListElements = elements
      });
  }

  async onOpenShoppingList(ev, shoppingListElements) {
    const popover = await this.popoverController.create({
      component: ShoppingListPopoverComponent,
      event: ev,
      translucent: true,
      cssClass: 'shopping-list-popover'
    });
    return await popover.present();
  }
}
