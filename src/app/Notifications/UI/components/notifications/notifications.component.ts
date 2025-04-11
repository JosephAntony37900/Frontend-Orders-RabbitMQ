// Notifications/UI/components/notifications/notifications.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertsService, AlertMessage } from '../../../../Shared/services/alerts.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notifications',
  template: ``,
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private alertSubscription: Subscription | undefined;

  constructor(private alertsService: AlertsService) {}

  ngOnInit(): void {
    this.alertSubscription = this.alertsService.getAlerts().subscribe((alert: AlertMessage) => {
      Swal.fire({
        icon: alert.icon,
        title: alert.title,
        text: alert.text,
        timer: 2000,
        showConfirmButton: false
      });
    });
  }

  ngOnDestroy(): void {
    this.alertSubscription?.unsubscribe();
  }
}
