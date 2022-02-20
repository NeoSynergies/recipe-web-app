import { Component, Input, OnInit } from '@angular/core';
import { RecipeIngredient } from 'src/app/common/interfaces/recipes';
import { ShoppingListService } from 'src/app/common/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-list-popover',
  templateUrl: './shopping-list-popover.component.html',
  styleUrls: ['./shopping-list-popover.component.scss'],
})
export class ShoppingListPopoverComponent implements OnInit {
  shoppingListElements: [] = [];
  groupedShoppingListElements = {};

  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  ngOnInit() {
    this.shoppingListService.shoppingListElements
      .subscribe(elements => {
        this.shoppingListElements = elements;

        // we reset the array everytime we get new elements
        this.groupedShoppingListElements = [];

        // we group elements by category
        this.groupElements();
      });
  }

  private groupElements() {
    this.shoppingListElements.map((element: any) => {
      if (this.groupedShoppingListElements[element.category]) {
        this.groupedShoppingListElements[element.category].push(element);
      } else {
        this.groupedShoppingListElements[element.category] = [];
        this.groupedShoppingListElements[element.category].push(element);
      }
    });
  }

  // this is to dynamically iterate to all groupedShoppingListElements properties in the html
  public get key(){
    return Object.keys(this.groupedShoppingListElements);
  }

  public onDeleteShoppingListValues(values: any): void {
    this.shoppingListService.deleteShoppingListElements(values)
      .subscribe();
  }

  public onAddCustomIngredient(label, unit, amount) {
    // we create the recipe ingredient (the id is created in the service)
    const ingredient: RecipeIngredient = {
      label,
      unit,
      amount
    };

    this.shoppingListService.addElementToShoppingList(ingredient, 'ingredients')
      .subscribe();
  }

}
