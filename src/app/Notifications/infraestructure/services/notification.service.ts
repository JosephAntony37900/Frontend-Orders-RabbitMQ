import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, timer } from "rxjs";
import { switchMap } from "rxjs/operators";
import { iNotification } from "../../domain/models/notification";
import { NotificationGateway } from "../../domain/gateways/notificationGateway";

export interface LongPollingResponse {
  notifications: iNotification[];
  last_timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements NotificationGateway {
  private apiURL = 'http://localhost:8081/notifications';
  private pollingSubject = new Subject< iNotification >();
  private lastTimestamp: string = new Date().toISOString();

  constructor (private httpClient: HttpClient) {}

  public startLongPolling(userId: number): void {
    timer(0, 9000)
      .pipe(
        switchMap(() => this.httpClient.get<LongPollingResponse>(`${this.apiURL}/${userId}?last_timestamp=${this.lastTimestamp}`))
      )
      .subscribe({
        next: (response) => {
          if(response.last_timestamp) {
            this.lastTimestamp = response.last_timestamp;
          }
          if(response.notifications && response.notifications.length > 0) {
            response.notifications.forEach((notif: iNotification) => {
              this.pollingSubject.next(notif);
            });
          }
        },
        error: (error) => {
          console.error("Error en long polling:", error);
        }
      });
  }

  public getNotifications(): Observable<iNotification> {
    return this.pollingSubject.asObservable();
  }

  getByIdUser(id: number): Observable<iNotification> {
    return this.httpClient.get<iNotification>(`${this.apiURL}/${id}`);
  }
}
