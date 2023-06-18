import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  navigationLinks: any[] = [
    { name: 'home', path: '' },
    { name: 'admin', path: 'admin', isAdmin: true },
    { name: 'login', path: 'login', isLoggedIn: false },
    { name: 'register', path: 'register', isLoggedIn: false },
    { name: 'logout', isLoggedIn: true }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  logOut() {
    this.authService.logout();
  }
}
