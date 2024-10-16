import {SpoDTOFlat} from "./spo-dto-flat.model";
import {SemesterDTO} from "./semester-dto.model";

export interface DocumentGenerationBulkDTO {
  spoDTOFlatList: SpoDTOFlat[];
  semesterDTO: SemesterDTO;
  studyGuide: boolean;
  moduleManual: boolean;
  spo: boolean;
}
