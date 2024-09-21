import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import {UserDTO} from "../../../core/models/user-dto.model";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['../../../core/stylesheets/details.css',
    '../../../core/stylesheets/formula.css']
})
export class UserDetailComponent implements OnInit {
  userForm: FormGroup;
  userId!: number;
  isEditing: boolean = false;
  user!: UserDTO;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {
    this.userForm = this.fb.group({
      id: [{value: '', disabled: true}],
      mail: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      title: [{value: '', disabled: true}],
      firstName: [{value: '', disabled: true}, Validators.required],
      lastName: [{value: '', disabled: true}, Validators.required],
      code: [{value: '', disabled: true}, Validators.required],
      role: [{value: '', disabled: true}, Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.loadUser();
    }
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe(user => {
      this.user = user;
      this.userForm.patchValue(user);
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.userForm.enable();
    } else {
      this.userForm.disable();
    }
  }

  saveUser(): void {
    if (this.userForm.valid) {
      const updatedUser: UserDTO = this.userForm.value;
      this.userService.updateUser(updatedUser).subscribe(() => {
      }, error => {
        console.error('Error updating user', error);
      });
      this.toggleEdit();
    }
  }

  goBack(): void {
    this.location.back();
  }
}

