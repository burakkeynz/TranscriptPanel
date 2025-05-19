import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  imports: [CommonModule, FormsModule],
})
export class AdminPanelComponent implements OnInit {
  users: any[] = [];
  newUser = { username: '', password: '', role: 'Editor' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  addUser() {
    this.userService.addUser(this.newUser).subscribe(() => {
      this.newUser = { username: '', password: '', role: 'Editor' };
      this.loadUsers();
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }
}

