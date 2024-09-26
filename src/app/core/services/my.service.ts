// app/services/my-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {UserDTO} from "../models/user-dto.model";
import {PasswordDTO} from "../models/passwordDTO";

@Injectable({
  providedIn: 'root'
})
export class MyService extends BaseService {

  constructor(protected override router: Router,
              protected override http: HttpClient) {
    super(router, http);
  }

  getUser(): Observable<UserDTO> {
    return this.get<UserDTO>('my/data');
  }

  updateUser(user: UserDTO): Observable<UserDTO> {
    return this.put<UserDTO>('my/update', user);
  }

  updatePassword(passwordDTO: PasswordDTO): Observable<UserDTO> {
    return this.put<UserDTO>('my/update-password', passwordDTO);
  }
}
