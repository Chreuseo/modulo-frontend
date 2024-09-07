// Assuming SectionDTO, ModuleTypeDTO, and DegreeDTO are defined elsewhere
import { SectionDTO } from './section-dto.model';
import { ModuleTypeDTO } from './module-type-dto.model';
import { DegreeDTO } from './degree-dto.model';

export interface SpoDTO {
  id: number; // Java long maps to TypeScript number
  header: string; // Java String maps to TypeScript string
  footer: string; // Java String maps to TypeScript string
  name: string; // Java String maps to TypeScript string
  publication: Date; // Java Date maps to TypeScript Date
  validFrom: Date; // Java Date maps to TypeScript Date
  validUntil: Date; // Java Date maps to TypeScript Date
  sectionDTOs: SectionDTO[]; // List<SectionDTO> maps to SectionDTO[]
  moduleTypeDTOs: ModuleTypeDTO[]; // List<ModuleTypeDTO> maps to ModuleTypeDTO[]
  degree: DegreeDTO; // Full DegreeDTO
}
