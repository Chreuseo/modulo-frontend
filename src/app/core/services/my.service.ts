// app/services/my-service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {UserDTO} from "../models/user-dto.model";
import {PasswordDTO} from "../models/passwordDTO";
import {NotificationDTO} from "../models/notification-dto.model";

@Injectable({
  providedIn: 'root'
})
export class MyService extends BaseService {

  constructor(protected override router: Router,
              protected override http: HttpClient) {
    super(router, http);
  }

  private readonly endpoint = 'my';

  getUser(): Observable<UserDTO> {
    return this.get<UserDTO>(`${this.endpoint}/data`);
  }

  updateUser(user: UserDTO): Observable<UserDTO> {
    return this.put<UserDTO>(`${this.endpoint}/update`, user);
  }

  updatePassword(passwordDTO: PasswordDTO): Observable<UserDTO> {


    // Make the PUT request with the custom headers
    return this.http.put<UserDTO>(`${this.endpoint}/update-password`, passwordDTO);
  }

  unreadNotifications(): Observable<number> {
    return this.get<number>(`${this.endpoint}/unread-notifications`);
  }

  getNotifications(): Observable<NotificationDTO[]> {
    return this.get<NotificationDTO[]>(`${this.endpoint}/notifications`);
  }
}
