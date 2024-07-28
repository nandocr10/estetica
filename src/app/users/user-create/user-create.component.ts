import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/api/services/auth.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  user: any = {};
  createError: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  createUser(): void {
    this.authService.createUser(this.user).subscribe(
      () => {
        this.router.navigate(['/users']);
      },
      (error) => {
        this.createError = error.message || 'Failed to create user.';
      }
    );
  }
}
