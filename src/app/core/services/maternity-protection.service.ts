import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {MaternityProtectionDTO} from "../models/maternity-protection-dto.model";

@Injectable({
  providedIn: 'root'
})
export class MaternityProtectionService extends BaseService {

  private readonly endpoint = 'api/maternity-protection'; // Base endpoint for maternity protections

  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Get all maternity protections
  getAllMaternityProtections(): Observable<MaternityProtectionDTO[]> {
    return this.get<MaternityProtectionDTO[]>(`${this.endpoint}/all`);
  }

  // Add a new maternity protection
  addMaternityProtection(maternityProtection: MaternityProtectionDTO): Observable<MaternityProtectionDTO> {
    return this.post<MaternityProtectionDTO>(`${this.endpoint}/new`, maternityProtection);
  }

  // Delete a maternity protection by ID
  deleteMaternityProtection(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/remove/${id}`);
  }
}
