import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/api/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  /*
  login(): void {
    const isAuthenticated = this.authService.login(this.username, this.password);
    if (isAuthenticated) {
      //this.router.navigate(['/users/create']);
      this.router.navigate(['/home']);
    } else {
      this.loginError = 'Invalid username or password';
    }
  }
  */
  login() {
    this.authService.login(this.username, this.password).subscribe(
        (response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/home']);
        },
        (error) => {
            alert('Invalid credentials');
            this.loginError = 'Invalid username or password';
        }
    );
  }
}
