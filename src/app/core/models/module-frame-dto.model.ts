import {SectionDTO} from "./section-dto.model";
import {ModuleTypeDTO} from "./module-type-dto.model";
import {CourseTypeDTO} from "./course-type-dto.model";
import {ExamTypeDTO} from "./exam-type-dto.model";


export interface ModuleFrameDTO {
  id: number;                   // Use number for long
  spoId: number;             // Reference to the existing SpoDTOFlat
  section: SectionDTO;         // Reference to the existing SectionDTO
  moduleType: ModuleTypeDTO;   // Reference to the existing ModuleTypeDTO
  quantity: number;
  name: string;
  sws: number;                 // Semester Weekly Hours
  weight: number;
  credits: number;
  courseTypes: CourseTypeDTO[]; // Reference to the existing CourseTypeDTO
  examTypes: ExamTypeDTO[];     // Reference to the existing ExamTypeDTO
}
