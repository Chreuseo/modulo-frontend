import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {ModuleFrameSetDTO} from "../models/module-frame-set-dto.model";
import {ModuleFrameDTO} from "../models/module-frame-dto.model";
import {HttpClient} from "@angular/common/http";
import {ModuleFrameModuleImplementationDTO} from "../models/module-frame-module-implementation-dto.model";

@Injectable({
  providedIn: 'root',
})
export class ModuleFrameService extends BaseService {

  private endpoint = 'api/module-frames';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Get ModuleFrameSetDTO by SPO ID
  getModuleFrameSetBySpoId(spoId: number): Observable<ModuleFrameSetDTO> {
    return this.get(`${this.endpoint}/spo/${spoId}`);
  }

  // Add a new ModuleFrame
  addModuleFrame(moduleFrame: ModuleFrameDTO): Observable<ModuleFrameDTO> {
    return this.post<ModuleFrameDTO>(`${this.endpoint}/new`, moduleFrame);
  }

  // Update an existing ModuleFrame
  updateModuleFrame(moduleFrame: ModuleFrameDTO): Observable<ModuleFrameDTO> {
    return this.put<ModuleFrameDTO>(`${this.endpoint}/update`, moduleFrame);
  }

  // Delete a ModuleFrame by ID
  deleteModuleFrame(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }
}
