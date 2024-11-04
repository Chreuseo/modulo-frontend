import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {MyService} from "../services/my.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../stylesheets/app.component.css']
})
export class AppComponent {
  title = 'frontend';
  currentRoute: String = '';
  unreadCount: number = 0;

  constructor(private authService: AuthService,
              private myService: MyService,
              private cookieService: CookieService) {}

  ngOnInit() {
    this.getCurrentRoute();
    this.fetchUnreadNotifications();
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        console.log('Logout successful')
        this.cookieService.deleteAll();
        window.location.reload();
      },
      error => console.error('Logout failed', error)
    );
  }

  fetchUnreadNotifications() {
    if(!this.currentRoute || this.currentRoute === '/login') {
      this.myService.unreadNotifications().subscribe(
        (count: number) => {
          this.unreadCount = count; // Set unread count from service
        },
        error => console.error('Failed to fetch unread notifications', error)
      );
    }
  }

  showNotifications() {
    console.log('Show notifications');
  }

  getCurrentRoute() {
    this.currentRoute = window.location.pathname;
  }
}
