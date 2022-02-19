import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-add-to-shopping-list',
  templateUrl: './add-to-shopping-list.component.html',
  styleUrls: ['./add-to-shopping-list.component.scss'],
})
export class AddToShoppingListComponent implements OnInit {
  @Input() values: any;
  @Input() valuesCategory: string;

  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  ngOnInit() {}

  onAddToShoppingList(): void {
    this.shoppingListService.addValueToShoppingList(this.values, this.valuesCategory)
      .subscribe(result => console.log(this.valuesCategory + ' added to shopping list'));
  }

}
