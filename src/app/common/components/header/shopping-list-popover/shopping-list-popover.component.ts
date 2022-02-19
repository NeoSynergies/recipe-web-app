import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list-popover',
  templateUrl: './shopping-list-popover.component.html',
  styleUrls: ['./shopping-list-popover.component.scss'],
})
export class ShoppingListPopoverComponent implements OnInit {
  @Input() shoppingListElements: [] = [];
  groupedShoppingListElements = {};
  constructor() { }

  ngOnInit() {
    this.shoppingListElements.map((element: any) => {
      if (this.groupedShoppingListElements[element.category]) {
        this.groupedShoppingListElements[element.category].push(element);
      } else {
        this.groupedShoppingListElements[element.category] = [];
        this.groupedShoppingListElements[element.category].push(element);
      }
    });
  }

  get key(){
    return Object.keys(this.groupedShoppingListElements);
  }

}
