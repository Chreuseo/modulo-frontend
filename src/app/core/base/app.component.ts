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
  unreadNotifications: number = 0;

  constructor(private authService: AuthService,
              private myService: MyService,
              private cookieService: CookieService) {}

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

  ngOnInit() {
    this.myService.unreadNotifications().subscribe(
      count => this.unreadNotifications = count,
      error => console.error('Error loading unread notifications', error)
    );
  }
}
