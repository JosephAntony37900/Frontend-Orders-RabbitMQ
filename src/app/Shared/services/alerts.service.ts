import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface AlertMessage {
  icon: 'success' | 'error' | 'info' | 'warning' | 'question';
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alertSubject = new Subject<AlertMessage>();

  getAlerts(): Observable<AlertMessage> {
    return this.alertSubject.asObservable();
  }

  showAlert(alert: AlertMessage): void {
    this.alertSubject.next(alert);
  }
}
