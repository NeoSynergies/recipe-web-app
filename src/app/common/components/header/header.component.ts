import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { combineLatest, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth/auth.service';
import { RecipesService } from '../../services/recipes/recipes.service';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { ShoppingListPopoverComponent } from './shopping-list-popover/shopping-list-popover.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  shoppingListElements = [];
  user: User;

  constructor(
    private shoppingListService: ShoppingListService,
    public popoverController: PopoverController,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.user
      .pipe(
        tap(user => this.user = user),
        switchMap(() => this.shoppingListService.shoppingListElements),
      )
      .subscribe(elements => {
        console.log(this.user);
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

  onRedirectToSearch(event) {
    this.router.navigate(['/search/'+event]);
  }
}
