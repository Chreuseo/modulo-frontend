// app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {UserDtoAuthModel} from "../models/user-dto-auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  login(userDtoAuth: UserDtoAuthModel): Observable<String> {
    return this.post<string>('auth/login', userDtoAuth);
  }

  logout(): Observable<void> {
    return this.post<void>('auth/logout', null);
  }
}
