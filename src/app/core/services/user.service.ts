import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {UserDTOFlat} from "../models/user-dto-flat.model"; // Adjust the import path accordingly

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private readonly endpoint = 'api/users'; // Adjust this endpoint to match your API

  constructor(http: HttpClient) {
    super(http);
  }

  getAllUsers(): Observable<UserDTOFlat[]> {
    return this.get<UserDTOFlat[]>(`${this.endpoint}/all`);
  }
}
