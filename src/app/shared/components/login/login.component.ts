import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {UserDtoAuthModel} from "../../../core/models/user-dto-auth.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../core/stylesheets/formula.css']
})


export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const userDtoAuth: UserDtoAuthModel = {
        mail: this.loginForm.value.mail,
        password: this.loginForm.value.password
      };

      this.authService.login(userDtoAuth).subscribe(
        (response: String) => {
          console.log('Login successful:', response);
          this.router.navigate(['/']); // navigate to home or dashboard after login
        },
        (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all fields correctly!';
    }
  }
}
