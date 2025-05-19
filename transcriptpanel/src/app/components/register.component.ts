// src/app/components/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router'

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RegisterComponent {
  username = '';
  password = '';
  role = 'Editor'; // Default olarak editor
  error = '';
  success = false;

  constructor(private authService: AuthService, public router: Router) {}

  register() {
    const payload = {
      username: this.username,
      password: this.password,
      role: this.role,
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.success = true;
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.error = 'Kayıt başarısız: ' + err.message;
        this.success = false;
      },
    });
  }
}
