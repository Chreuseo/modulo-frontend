// exam-type.dto.ts
export interface ExamTypeDTO {
  id: number;
  name: string;
  abbreviation: string;
  length: string;
  description: string;
  spoId: number;
  enabled: boolean; // This field was included in your DTO but not in the entity, ensure it fits your needs
  mandatory: boolean;
}
