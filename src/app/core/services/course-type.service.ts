import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {DegreeDTO} from "../models/degree-dto.model";
import {HttpClient} from "@angular/common/http";
import {CourseTypeDTO} from "../models/course-type-dto.model";

@Injectable({
  providedIn: 'root'
})
export class CourseTypeService extends BaseService {

  private readonly endpoint = 'api/course-types';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Get all degrees
  getAllCourseTypes(): Observable<CourseTypeDTO[]> {
    return this.get<CourseTypeDTO[]>(`${this.endpoint}/all`);
  }

  // Add a new degree
  addCourseType(degree: DegreeDTO): Observable<CourseTypeDTO> {
    return this.post<CourseTypeDTO>(`${this.endpoint}/new`, degree);
  }

  // Delete a degree by ID
  deleteCourseType(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/remove/${id}`);
  }
}
