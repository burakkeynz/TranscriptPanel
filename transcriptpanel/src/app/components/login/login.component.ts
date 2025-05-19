import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, public router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        const decoded: any = jwtDecode(response.token);
        const role = decoded.role;

        if (role === 'Admin') {
          this.router.navigate(['/admin-panel']);
        } else {
          this.router.navigate(['/']); // transcript-editor
        }
      },
      error: (err) => {
        this.errorMessage = 'Giriş başarısız.';
      },
    });
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
