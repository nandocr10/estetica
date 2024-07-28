import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/user'; // URL do backend
  private isAuthenticated = false;

 

  constructor(private http: HttpClient,  router: Router) { }

  private validUser = {
    username: '',
    password: ''
  }
  
  // Métodos de autenticação
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
}

logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    //this.router.navigate(['/login']);
}

isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
}

getToken(): string | null {
    return localStorage.getItem('authToken');
}

/*
  login(username: string, password: string): boolean {
      // Simulando validação no backend
      if (username === this.validUser.username && password === this.validUser.password) {
        localStorage.setItem('currentUser', JSON.stringify({ username }));
        return true;
      }
      return false;
  }
*/
  // Métodos CRUD para usuários
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
 /*
  logout(): void {
    this.isAuthenticated = false;
    //this.router.navigate(['login']);
  }
*/
  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

  

}
