import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');

    // Token yoksa login'e yönlendir
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRole = route.data['role'];
    if (expectedRole) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userRole = payload?.role;

        if (userRole !== expectedRole) {
          this.router.navigate(['/login']);
          return false;
        }
      } catch (error) {
        this.router.navigate(['/login']);
        return false;
      }
    }

    // Token varsa ve rol uyuyorsa geç
    return true;
  }
}

