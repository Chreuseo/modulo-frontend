import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {UserDTOFlat} from "../models/user-dto-flat.model";
import {UserDTO} from "../models/user-dto.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private readonly endpoint = 'users'; // Adjust this endpoint to match your API

  constructor(protected override router: Router,
              protected override http: HttpClient) {
    super(router, http);
  }

  getAllUsers(): Observable<UserDTOFlat[]> {
    return this.get<UserDTOFlat[]>(`${this.endpoint}/all`);
  }

  getUsersByRole(role: string): Observable<UserDTOFlat[]> {
    return this.get<UserDTOFlat[]>(`${this.endpoint}/role/${role}`);
  }

  getUserById(id: number): Observable<UserDTO> {
    return this.get<UserDTO>(`${this.endpoint}/${id}`);
  }

  addUser(user: UserDTO): Observable<UserDTO> {
    return this.post<UserDTO>(`${this.endpoint}/new`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/remove/${id}`);
  }

  updateUser(user: UserDTO): Observable<UserDTO> {
    return this.put<UserDTO>(`${this.endpoint}/update`, user);
  }

  changePassword(password: string): Observable<void> {
    return this.put<void>(`${this.endpoint}/change-password`, { password });
  }

  resetPassword(id: number): Observable<void> {
    return this.put<void>(`${this.endpoint}/password-reset/${id}`, {});
  }
}
