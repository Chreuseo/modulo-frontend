import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {MyService} from "../services/my.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../stylesheets/app.component.css']
})
export class AppComponent {
  title = 'frontend';
  unreadCount: number = 0;

  constructor(private authService: AuthService,
              private myService: MyService,
              private cookieService: CookieService,
              private router: Router) {}

  ngOnInit() {
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
    if(this.getCurrentRoute().includes('login')) {
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

  getCurrentRoute(): any {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd)) // Only get the NavigationEnd events
      .subscribe((event: NavigationEnd) => {
        return event.url; // Capture the current route URL
      });
  }
}
