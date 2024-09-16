import {ModuleImplementationDTOFlat} from "./module-implementation-dto-flat.model";
import {ModuleRequirementDTO} from "./module-requirement-dto.model";
import {ExamTypeDTO} from "./exam-type-dto.model";
import {ModuleFrameDTO} from "./module-frame-dto.model";

export interface ModuleFrameModuleImplementationDTO {
  id: number;
  moduleImplementationDTOFlat: ModuleImplementationDTOFlat;
  moduleFrameDTO: ModuleFrameDTO;
  moduleRequirementDTO: ModuleRequirementDTO | null;
  examTypeDTOs: ExamTypeDTO[];
}
