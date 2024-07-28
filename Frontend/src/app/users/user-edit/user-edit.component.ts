import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/api/services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: any = {};
  updateError: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.authService.getUser(id).subscribe(data => {
      this.user = data;
    });
  }

  updateUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.authService.updateUser(id, this.user).subscribe(
      () => {
        this.router.navigate(['/users']);
      },
      (error) => {
        this.updateError = error.message || 'Failed to update user.';
      }
    );
  }

  cancelUpdate(): void {
    this.router.navigate(['/users']);
  }
}
