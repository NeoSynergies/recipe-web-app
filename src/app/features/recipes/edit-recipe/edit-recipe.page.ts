import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/common/interfaces/user';
import { AuthService } from 'src/app/common/services/auth/auth.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
  user: User;
  recipe;
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user
      .subscribe(user => {
        this.user = user;
        this.recipe = history.state.recipe;
      });
  }

}
