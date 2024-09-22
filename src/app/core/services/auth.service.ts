// app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {UserDtoAuthModel} from "../models/user-dto-auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  login(userDtoAuth: UserDtoAuthModel): Observable<string> {
    return this.post<string>('auth/login', userDtoAuth);
  }
}
