import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from "../../../core/services/user.service";
import {UserDTO} from "../../../core/models/user-dto.model";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['../../../core/stylesheets/formula.css']
})
export class NewUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      title: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      code: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSaveAndNew(): void {
    if (this.userForm.invalid) {
      return;
    }

    const user: UserDTO = this.userForm.value;

    this.userService.addUser(user).subscribe(() => {
      // Clear the form
      this.userForm.reset();
      alert('User saved successfully. You can add a new user!');
    });
  }

  onSaveAndOpen(): void {
    if (this.userForm.invalid) {
      return;
    }

    const user: UserDTO = this.userForm.value;

    this.userService.addUser(user).subscribe((savedUser) => {
      // Navigate to the newly created user
      this.router.navigate(['/user', savedUser.id]); // Ensure `id` is available in your UserDTO
    });
  }

  onCancel(): void {
    this.router.navigate(['/user']);
  }
}
