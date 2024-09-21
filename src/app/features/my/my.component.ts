import { Component } from '@angular/core';
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['../../core/stylesheets/settings.css']
})
export class MyComponent {

  newPassword: string = '';
  newPasswordRepeat: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  changePassword() {
    if (this.newPassword !== this.newPasswordRepeat) {
      console.error('Passwords do not match');
      // Handle error as needed, such as showing a message to the user
      return
    }
    this.userService.changePassword(this.newPassword).subscribe(
      () => {
        console.log('Password changed successfully');
        this.newPassword = '';
        this.newPasswordRepeat = '';
      },
      (error) => {
        console.error('Error changing password', error);
        // Handle error as needed, such as showing a message to the user
      }
    );
  }
  // Add methods here
}
