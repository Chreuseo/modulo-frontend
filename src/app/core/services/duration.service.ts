import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {DurationDTO} from "../models/duration-dto.model";

@Injectable({
  providedIn: 'root'
})
export class DurationService extends BaseService {

  private readonly endpoint = 'api/duration'; // Base endpoint for durations

  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Get all durations
  getAllDurations(): Observable<DurationDTO[]> {
    return this.get<DurationDTO[]>(`${this.endpoint}/all`);
  }

  // Add a new duration
  addDuration(duration: DurationDTO): Observable<DurationDTO> {
    return this.post<DurationDTO>(`${this.endpoint}/new`, duration);
  }

  // Delete a duration by ID
  deleteDuration(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/remove/${id}`);
  }
}
