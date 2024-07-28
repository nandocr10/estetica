import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout() {
    // Lógica de logout (por exemplo, remover o token de autenticação)
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
