import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  public notification$ = this.notificationSubject.asObservable();

  constructor() { }

  displayNotification(message: string) {
    this.notificationSubject.next(message);
    console.log(message);
  }
}
