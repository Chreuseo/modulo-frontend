// src/app/core/models/spo-dto-flat.model.ts

import { DegreeDTO } from './degree-dto.model'; // Adjust the import path as necessary

export interface SpoDTOFlat {
  id: number;        // Using number for long
  name: string;

  degree: DegreeDTO;  // Full DegreeDTO

  publication: Date;
  validFrom: Date;    // New field that corresponds to Date in Java
  validUntil: Date;   // New field that corresponds to Date in Java
}
