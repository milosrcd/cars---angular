import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) { }

  canLoad(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
