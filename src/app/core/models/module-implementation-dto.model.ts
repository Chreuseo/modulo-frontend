// module-implementation-dto.model.ts


import { DurationDTO } from './duration-dto.model';
import { LanguageDTO } from './language-dto.model';
import { MaternityProtectionDTO } from './maternity-protection-dto.model';
import {CycleDTO} from "./cycle-dto.model";
import {UserDTOFlat} from "./user-dto-flat.model";
import {ModuleRequirementDTO} from "./module-requirement-dto.model";
import {ModuleMappingDTO} from "./module-mapping-dto.model";

export interface ModuleImplementationDTO {
  id: number;                                       // Using number for Long
  name: string;
  abbreviation: string;
  courseType: string;
  allowedResources: string;                         // Fixed typo to match the entity
  firstExaminant: UserDTOFlat | null;                         // Assuming UserDTO structure
  secondExaminant: UserDTOFlat | null;                        // Assuming UserDTO structure
  responsible: UserDTOFlat | null;                            // Assuming UserDTO structure
  cycle: CycleDTO | null;                                 // Assuming CycleDTO structure
  duration: DurationDTO | null;                           // Assuming DurationDTO structure
  language: LanguageDTO | null;                           // Assuming LanguageDTO structure
  requiredCompetences: string;
  qualificationTargets: string;
  content: string;
  maternityProtection: MaternityProtectionDTO;     // Assuming MaternityProtectionDTO structure

  moduleMappingDTOs: ModuleMappingDTO[];           // Assuming ModuleMappingDTO structure
}

// Assuming you will also create ModuleRequirementDTO with the necessary fields similar to above DTOs
