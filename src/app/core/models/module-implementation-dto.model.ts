// module-implementation-dto.model.ts


import { DurationDTO } from './duration-dto.model';
import { LanguageDTO } from './language-dto.model';
import { MaternityProtectionDTO } from './maternity-protection-dto.model';
import {CycleDTO} from "./cycle-dto.model";
import {UserDTOFlat} from "./user-dto-flat.model";

export interface ModuleImplementationDTO {
  id: number;                                       // Using number for Long
  name: string;
  abbreviation: string;
  allowedResources: string;                         // Fixed typo to match the entity
  firstExaminant: UserDTOFlat | null;                         // Assuming UserDTO structure
  secondExaminant: UserDTOFlat | null;                        // Assuming UserDTO structure
  responsible: UserDTOFlat | null;                            // Assuming UserDTO structure
  lecturers: UserDTOFlat[];                                    // Assuming UserDTO structure
  cycle: CycleDTO | null;                                 // Assuming CycleDTO structure
  duration: DurationDTO | null;                           // Assuming DurationDTO structure
  language: LanguageDTO | null;
  workload: string;
  requiredCompetences: string;
  qualificationTargets: string;
  content: string;
  additionalExams: string;
  mediaTypes: string;
  literature: string;
  maternityProtection: MaternityProtectionDTO | null;     // Assuming MaternityProtectionDTO structure
}

// Assuming you will also create ModuleRequirementDTO with the necessary fields similar to above DTOs
