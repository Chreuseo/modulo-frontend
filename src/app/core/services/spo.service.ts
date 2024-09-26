import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { SpoDTOFlat } from '../models/spo-dto-flat.model';
import {HttpClient} from "@angular/common/http";
import {SpoDTO} from "../models/spo-dto.model";
import {Router} from "@angular/router"; // Adjust the import based on your model's location

@Injectable({
  providedIn: 'root'
})
export class SpoService extends BaseService {
  private readonly endpoint = 'spo'; // Define your SPO endpoint

  constructor(protected override router: Router,
              protected override http: HttpClient) {
    super(router, http);
  }

  getSpo(id: number): Observable<SpoDTO> {
    return this.get<SpoDTO>(`${this.endpoint}/get/${id}`);
  }

  // Fetch all SPO items
  getAll(): Observable<SpoDTOFlat[]> {
    return this.get<SpoDTOFlat[]>(`${this.endpoint}/all`);
  }

  addSpo(spo: SpoDTOFlat): Observable<SpoDTOFlat> {
    return this.post<SpoDTOFlat>(`${this.endpoint}/new`, spo);
  }

  deleteSpo(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/remove/${id}`);
  }

  updateSpo(spo: SpoDTO): Observable<SpoDTOFlat> {
    return this.put<SpoDTOFlat>(`${this.endpoint}/update`, spo);
  }
  // Additional methods follow the same logic
}
