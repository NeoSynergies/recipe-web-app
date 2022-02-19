import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-to-shopping-list',
  templateUrl: './add-to-shopping-list.component.html',
  styleUrls: ['./add-to-shopping-list.component.scss'],
})
export class AddToShoppingListComponent implements OnInit {
  @Input() valueToAdd: any;
  @Input() typeOfValue: string;
  constructor() { }

  ngOnInit() {}

  onAddToShoppingList(): void {
    
  }

}
