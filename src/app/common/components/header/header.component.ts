import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  shoppingListElements = [];
  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  ngOnInit() {
    this.shoppingListService.shoppingListElements
      .subscribe(elements => this.shoppingListElements = elements);
  }

}
