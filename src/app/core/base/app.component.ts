import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {MyService} from "../services/my.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../stylesheets/app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  unreadCount: number = 0;

  constructor(private authService: AuthService,
              private myService: MyService,
              private cookieService: CookieService,
              private router: Router) {}

  ngOnInit() : void {
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
    this.myService.unreadNotifications().subscribe(
      (count: number) => {
        this.unreadCount = count; // Set unread count from service
      },
      error => console.error('Failed to fetch unread notifications', error)
    );
  }

  showNotifications() {
    this.unreadCount = 0; // Reset unread count
    this.router.navigate(['/notifications']);
  }
}
