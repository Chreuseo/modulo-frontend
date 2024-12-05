import { Component, OnInit } from '@angular/core';
import {UserDTOFlat} from "../../../core/models/user-dto-flat.model";
import {UserService} from "../../../core/services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../../../core/stylesheets/list-view.css']
})
export class UserListComponent implements OnInit {

  users: UserDTOFlat[] = []; // Initialize an empty array for users
  loading: boolean = false;   // Track the loading state
  error: string | null = null; // For error handling

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers(); // Call function on component initialization
  }

  fetchUsers(): void {
    this.loading = true; // Set loading to true when fetching users
    this.userService.getAllUsers().subscribe({
      next: (data: UserDTOFlat[]) => {
        this.users = data;
        this.loading = false; // Set loading to false after fetching
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.error = 'Could not fetch users. Please try again later.'; // Set error message
        this.loading = false; // Set loading to false even on error
      }
    });
  }

  navigateToNewUser(): void {
    this.router.navigate(['/user/new']); // Navigate to the new user route
  }

  navigateToUserDetail(id: number): void {
    this.router.navigate(['/user', id]); // Navigate to the user detail route with the user id
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== id); // Remove the deleted user from the list
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('An error occurred. Please try again later.'); // Notify the user of the error
        }
      });
    }
  }

  passwordReset(id: number): void {
    if(confirm('Are you sure you want to reset the password for this user?')) {
      this.userService.resetPassword(id).subscribe({
        next: () => {
          alert('Password reset successfully. The new password has been sent to the user.'); // Notify the user of the password reset
        },
        error: (err: any) => {
          console.error('Error resetting password:', err);
          alert('An error occurred. Please try again later.'); // Notify the user of the error
        }
      });
    }
  }
}
