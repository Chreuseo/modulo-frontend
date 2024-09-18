// src/app/core/services/module-implementation.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleImplementationDTOFlat } from '../models/module-implementation-dto-flat.model'; // Adjust import path as necessary
import { BaseService } from './base.service';
import {HttpClient} from "@angular/common/http";
import {ModuleImplementationDTO} from "../models/module-implementation-dto.model"; // Adjust import path as necessary

@Injectable({
  providedIn: 'root',
})
export class ModuleImplementationService extends BaseService {
  private endpoint = 'module-implementation'; // Specify endpoint for module implementations

  constructor(http: HttpClient) {
    super(http);
  }

  // Method to get all module implementations
  getAll(): Observable<ModuleImplementationDTOFlat[]> {
    return this.get<ModuleImplementationDTOFlat[]>(`${this.endpoint}/all`);
  }

  addModuleImplementation(moduleImplementation: ModuleImplementationDTOFlat): Observable<ModuleImplementationDTOFlat> {
    return this.post<ModuleImplementationDTOFlat>(`${this.endpoint}/new`, moduleImplementation);
  }

  getById(id: number): Observable<ModuleImplementationDTO> {
    return this.get<ModuleImplementationDTO>(`${this.endpoint}/${id}`);
  }

  getFlatById(id: number): Observable<ModuleImplementationDTOFlat> {
    return this.get<ModuleImplementationDTOFlat>(`${this.endpoint}/flat/${id}`);
  }

  updateModuleImplementation(moduleImplementation: ModuleImplementationDTO): Observable<ModuleImplementationDTO> {
    return this.put<ModuleImplementationDTO>(`${this.endpoint}/update`, moduleImplementation);
  }

  // Add lecturer to module implementation
  addLecturer(moduleImplementationId: number, lecturerId: number): Observable<ModuleImplementationDTO> {
    return this.post<ModuleImplementationDTO>(`${this.endpoint}/${moduleImplementationId}/lecturer/add/${lecturerId}`, {});
  }

  // Remove lecturer from module implementation
  removeLecturer(moduleImplementationId: number, lecturerId: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/${moduleImplementationId}/lecturer/remove/${lecturerId}`);
  }
}
