import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../stylesheets/app.component.css',
              '../stylesheets/shared.css',
              '../stylesheets/modulo-colors.css.css',]
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
        window.location.reload();
      },
      error => console.error('Logout failed', error)
    );
  }
}
