import {SemesterDTO} from "./semester-dto.model";
import {SpoDTOFlat} from "./spo-dto-flat.model";

export interface SpoDocumentsDTO {
  spo: SpoDTOFlat;
  documents: Document[];
  semesters: Semester[];
}

interface Semester {
  semester: SemesterDTO;
  documents: Document[];
}

interface Document {
  name: string;
  friendlyName: string;
}
