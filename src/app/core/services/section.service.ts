import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {SectionDTO} from "../models/section-dto.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SectionService extends BaseService {

  private readonly endpoint = 'api/section';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Add a new section
  addSection(section: SectionDTO): Observable<SectionDTO> {
    return this.post<SectionDTO>(`${this.endpoint}/new`, section);
  }

  // Delete a section by ID
  deleteSection(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/remove/${id}`);
  }

}
