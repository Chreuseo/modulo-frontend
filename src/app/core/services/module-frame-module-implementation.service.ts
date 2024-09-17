import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from "./base.service";
import {ModuleFrameModuleImplementationDTO} from "../models/module-frame-module-implementation-dto.model";

@Injectable({
  providedIn: 'root'
})
export class ModuleFrameModuleImplementationService extends BaseService {

  // Define the endpoint for the service
  private readonly endpoint = 'module-frame-module-implementations';

  constructor(http: HttpClient) {
    super(http); // Pass the HttpClient to the base class
  }

  // Get all ModuleFrameModuleImplementations
  getAll(): Observable<ModuleFrameModuleImplementationDTO[]> {
    return this.get<ModuleFrameModuleImplementationDTO[]>(`${this.endpoint}/all`);
  }

  // Get ModuleFrameModuleImplementation by ID
  getById(id: number): Observable<ModuleFrameModuleImplementationDTO> {
    return this.get<ModuleFrameModuleImplementationDTO>(`${this.endpoint}/${id}`);
  }

  // Get ModuleFrameModuleImplementations by Module Frame ID
  getByModuleFrameId(moduleFrameId: number): Observable<ModuleFrameModuleImplementationDTO[]> {
    return this.get<ModuleFrameModuleImplementationDTO[]>(`${this.endpoint}/module-frame/${moduleFrameId}`);
  }

  // Get ModuleFrameModuleImplementations by Module Implementation ID
  getByModuleImplementationId(moduleImplementationId: number): Observable<ModuleFrameModuleImplementationDTO[]> {
    return this.get<ModuleFrameModuleImplementationDTO[]>(`${this.endpoint}/module-implementation/${moduleImplementationId}`);
  }

  // Create a new ModuleFrameModuleImplementation
  add(dto: ModuleFrameModuleImplementationDTO): Observable<ModuleFrameModuleImplementationDTO> {
    return this.post<ModuleFrameModuleImplementationDTO>(`${this.endpoint}/add`, dto);
  }

  // Update an existing ModuleFrameModuleImplementation
  update(dto: ModuleFrameModuleImplementationDTO): Observable<ModuleFrameModuleImplementationDTO> {
    return this.put<ModuleFrameModuleImplementationDTO>(`${this.endpoint}/update`, dto);
  }

  // Delete a ModuleFrameModuleImplementation by ID
  remove(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/delete/${id}`);
  }
}
