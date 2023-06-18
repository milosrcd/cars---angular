import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const loggedUser = JSON.parse(localStorage.getItem('logged_user')!)
    let userId;
    if (loggedUser && loggedUser.id) {
      userId = JSON.stringify(loggedUser.id);
    } else {
      userId = 'Not logged in';
    }

    request = request.clone({
      headers: request.headers.set('UserId', userId)
      })

    return next.handle(request);
  }
}
