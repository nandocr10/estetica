import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/api/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  constructor(private userService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users; // Certifique-se de atualizar filteredUsers
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => 
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  createUser(): void {
    this.router.navigate(['/users/create']);
  }

  editUser(id: number): void {
    this.router.navigate([`/users/edit/${id}`]);
  }

  deleteUser(id: number): void {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.fetchUsers(); // Atualizar lista após deleção
      });
    }
  }
}
