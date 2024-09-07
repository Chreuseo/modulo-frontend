import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {DegreeDTO} from "../models/degree-dto.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DegreeService extends BaseService {

  private readonly endpoint = 'api/degree';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Get all degrees
  getAllDegrees(): Observable<DegreeDTO[]> {
    return this.get<DegreeDTO[]>(`${this.endpoint}/all`);
  }

  // Add a new degree
  addDegree(degree: DegreeDTO): Observable<DegreeDTO> {
    return this.post<DegreeDTO>(`${this.endpoint}/new`, degree);
  }

  // Delete a degree by ID
  deleteDegree(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/remove/${id}`);
  }
}
