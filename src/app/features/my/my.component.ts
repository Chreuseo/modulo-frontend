// app/components/my-component/my-component.component.ts
import { Component, OnInit } from '@angular/core';
import {UserDTO} from "../../core/models/user-dto.model";
import {PasswordDTO} from "../../core/models/passwordDTO";
import {MyService} from "../../core/services/my.service";
@Component({
  selector: 'app-my-component',
  templateUrl: './my.component.html',
  styleUrls: ['../../core/stylesheets/formula.css']
})
export class MyComponent implements OnInit {
  user!: UserDTO;
  editing: boolean = false;
  passwordDTO!: PasswordDTO;

  constructor(private myService: MyService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.myService.getUser().subscribe(
      user => this.user = user,
      error => console.error('Error loading user', error)
    );
  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }

  saveUser(): void {
    this.myService.updateUser(this.user).subscribe(
      updatedUser => {
        this.user = updatedUser;
        this.editing = false;
      },
      error => console.error('Error updating user', error)
    );
  }

  updatePassword(): void {
    this.myService.updatePassword(this.passwordDTO).subscribe(
      () => {
        this.passwordDTO = {} as PasswordDTO; // Reset password fields
        console.log('Password updated successfully');
      },
      error => console.error('Error updating password', error)
    );
  }
}
