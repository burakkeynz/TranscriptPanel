import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import {RouterModule} from '@angular/router';
import {NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  username: string | null = null;
  role: string | null = null;
  activeRoute: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.updateUserInfo();

    this.authService.userChanged.subscribe(() => {
      this.updateUserInfo();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.activeRoute = event.url;
    });
  }

  updateUserInfo(): void {
    this.username = this.authService.getUsernameFromToken();
    this.role = this.authService.getRoleFromToken();
  }

  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

