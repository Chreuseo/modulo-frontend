// app/core/services/exam-type.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from "./base.service";
import {ExamTypeDTO} from "../models/exam-type-dto.model";

@Injectable({
  providedIn: 'root'
})
export class ExamTypeService extends BaseService {

  private endpoint = 'api/exam-types'; // Adjust according to your backend setup

  constructor(protected override http: HttpClient) {
    super(http);
  }

  getBySpo(spoId: number): Observable<ExamTypeDTO[]> {
    return this.get<ExamTypeDTO[]>(`${this.endpoint}/spo/${spoId}`);
  }

  getByModuleFrame(spoId: number): Observable<ExamTypeDTO[]> {
    return this.get<ExamTypeDTO[]>(`${this.endpoint}/module-frame/${spoId}`);
  }

  add(examType: ExamTypeDTO): Observable<ExamTypeDTO> {
    return this.post<ExamTypeDTO>(this.endpoint + '/add', examType);
  }

  remove(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/remove/${id}`);
  }

  update(examType: ExamTypeDTO): Observable<ExamTypeDTO> {
    return this.put<ExamTypeDTO>(this.endpoint + '/update', examType);
  }
}
