import {Component, OnInit} from '@angular/core';
import {NotificationDTO} from "../../core/models/notification-dto.model";
import {MyService} from "../../core/services/my.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['../../core/stylesheets/list-view.css']
})
export class NotificationComponent implements OnInit {
  notifications: NotificationDTO[] = [];

  constructor(private myService: MyService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.myService.getNotifications().subscribe({
      next: (response) => {
        this.notifications = response;
      },
      error: (error) => {
        console.error('Error fetching notifications', error);
      }
    });
  }
}
