import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../interfaces/register-form.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // message: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: LoginForm) {
    return this.httpClient.get(`${environment.baseApiUrl}users?email=${user.email}&password=${user.password}`)
      .pipe(
        tap((data: any) => {
          if (data.length) {
            localStorage.setItem('logged_user', JSON.stringify(data[0]));
            location.assign('admin')
          } else {
            alert('Your email or password are incorrect.');
          }
        })
      )
  }

  register(user: User) {
    return this.httpClient.post(`${environment.baseApiUrl}users`, user);
  }

  logout() {
    localStorage.removeItem('logged_user');
    location.assign('');
  }


  isAdmin() {
    const logged_user = localStorage.getItem('logged_user');

    if (!logged_user) {
      this.router.navigateByUrl('/login');
      return false;

    }

    const user = JSON.parse(logged_user);
    return user.role === 'admin';
  }

  isLoggedIn() {
    const logged_user = localStorage.getItem('logged_user');
    return !logged_user;
  }

  getUserName(): string {
    const loggedUser = JSON.parse(localStorage.getItem('logged_user')!);
    if (loggedUser && loggedUser.fullName) {
      return loggedUser.fullName;
    } else {
      return ', you should login';
    }
  }

}
