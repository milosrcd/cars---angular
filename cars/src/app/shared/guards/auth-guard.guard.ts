import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }


  canActivate(): boolean {
    return this.isAuthenticated();
  }

  private isAuthenticated(): boolean {
    if (!this.authService.isAdmin()) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }
}
