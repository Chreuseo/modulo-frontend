// src/app/core/services/module-implementation.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleImplementationDTOFlat } from '../models/module-implementation-dto-flat.model'; // Adjust import path as necessary
import { BaseService } from './base.service';
import {HttpClient} from "@angular/common/http"; // Adjust import path as necessary

@Injectable({
  providedIn: 'root',
})
export class ModuleImplementationService extends BaseService {
  private endpoint = 'api/module-implementation/all'; // Specify endpoint for module implementations

  constructor(http: HttpClient) {
    super(http);
  }

  // Method to get all module implementations
  getAll(): Observable<ModuleImplementationDTOFlat[]> {
    return this.get<ModuleImplementationDTOFlat[]>(this.endpoint);
  }
}
