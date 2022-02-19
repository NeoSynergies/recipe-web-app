import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/interfaces/user';
import { AuthService } from 'src/app/common/services/auth/auth.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage implements OnInit {
  user: User;
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user
      .subscribe(user => this.user = user);
  }
}
