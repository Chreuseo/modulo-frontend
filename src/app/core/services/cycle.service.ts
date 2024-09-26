import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {DurationDTO} from "../models/duration-dto.model";
import {CycleDTO} from "../models/cycle-dto.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CycleService extends BaseService {

  private readonly endpoint = 'cycle'; // Base endpoint for durations

  constructor(protected override router: Router,
              protected override http: HttpClient) {
    super(router, http);
  }

  // Get all durations
  getAllCycles(): Observable<CycleDTO[]> {
    return this.get<CycleDTO[]>(`${this.endpoint}/all`);
  }

  // Add a new duration
  addCycle(duration: CycleDTO): Observable<DurationDTO> {
    return this.post<CycleDTO>(`${this.endpoint}/add`, duration);
  }

  // Delete a duration by ID
  deleteCycle(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/remove/${id}`);
  }
}
