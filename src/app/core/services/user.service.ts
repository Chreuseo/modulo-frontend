import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {UserDTOFlat} from "../models/user-dto-flat.model";
import {UserDTO} from "../models/user-dto.model"; // Adjust the import path accordingly

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private readonly endpoint = 'users'; // Adjust this endpoint to match your API

  constructor(http: HttpClient) {
    super(http);
  }

  getAllUsers(): Observable<UserDTOFlat[]> {
    return this.get<UserDTOFlat[]>(`${this.endpoint}/all`);
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
}
