import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {ModuleRequirementDTO} from "../models/module-requirement-dto.model";


@Injectable({
  providedIn: 'root'
})
export class ModuleRequirementService extends BaseService {

  private readonly endpoint = 'api/module-requirements';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  addModuleRequirement(moduleRequirement: ModuleRequirementDTO): Observable<ModuleRequirementDTO> {
    return this.post<ModuleRequirementDTO>(`${this.endpoint}/add`, moduleRequirement);
  }

  remove(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/remove/${id}`);
  }

  update(moduleRequirement: ModuleRequirementDTO): Observable<ModuleRequirementDTO> {
    return this.put<ModuleRequirementDTO>(`${this.endpoint}/update`, moduleRequirement);
  }

  getBySpoId(spoId: number): Observable<ModuleRequirementDTO[]> {
    let params = new HttpParams().set('spoId', spoId.toString());
    return this.get<ModuleRequirementDTO[]>(`${this.endpoint}/spo/${spoId}`, params);
  }
}
