import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {SectionDTO} from "../models/section-dto.model";
import {ModuleTypeDTO} from "../models/module-type-dto.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ModuleTypeService extends BaseService {

  private readonly endpoint = 'api/module-type';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Add a new module type
  addModuleType(moduleType: ModuleTypeDTO): Observable<SectionDTO> {
    return this.post<ModuleTypeDTO>(`${this.endpoint}/new`, moduleType);
  }

  // Delete a module type by ID
  deleteModuleType(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/remove/${id}`);
  }

}
