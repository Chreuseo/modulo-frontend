// src/app/core/models/module-implementation-dto-flat.model.ts

import { SpoDTOFlat } from './spo-dto-flat.model'; // Adjust the import path as necessary

export interface ModuleImplementationDTOFlat {
  id: number;                        // Using number for Long
  name: string;
  abbreviation: string;
  spos: SpoDTOFlat[];               // List of SpoDTOFlat
}
