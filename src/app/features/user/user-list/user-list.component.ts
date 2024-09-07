import { Component, OnInit } from '@angular/core';
import {UserDTOFlat} from "../../../core/models/user-dto-flat.model";
import {UserService} from "../../../core/services/user.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../../../core/stylesheets/list-view.css']
})
export class UserListComponent implements OnInit {

  users: UserDTOFlat[] = []; // Initialize an empty array for users
  loading: boolean = false;   // Track the loading state
  error: string | null = null; // For error handling

  constructor(private userService: UserService) { }

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
}
