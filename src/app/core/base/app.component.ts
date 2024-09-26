import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: '../stylesheets/app.component.css',
})
export class AppComponent {
  title = 'frontend';

  constructor(private authService: AuthService,
              private cookieService: CookieService) {}

  logout() {
    this.authService.logout().subscribe(
      () => {
        console.log('Logout successful')
        this.cookieService.deleteAll();
      },
      error => console.error('Logout failed', error)
    );
  }
}
