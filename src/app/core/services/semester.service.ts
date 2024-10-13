import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {SemesterDTO} from "../models/semester-dto.model";

@Injectable({
  providedIn: 'root'
})
export class SemesterService extends BaseService {

  private endpoint: string = 'semester';

  constructor(
    protected override http: HttpClient,
    protected override router: Router
  ) {
    super(router, http);
  }

  public getAllSemesters(): Observable<SemesterDTO[]> {
    return this.get<SemesterDTO[]>(`${this.endpoint}/all`);
  }

  public addSemester(semester: SemesterDTO): Observable<SemesterDTO> {
    return this.post<SemesterDTO>(`${this.endpoint}/add`, semester);
  }

  public updateSemester(semester: SemesterDTO): Observable<SemesterDTO> {
    return this.put<SemesterDTO>(`${this.endpoint}/update`, semester);
  }

  public removeSemester(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/remove/${id}`);
  }
}
