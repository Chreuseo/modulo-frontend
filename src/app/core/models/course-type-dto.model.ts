export interface CourseTypeDTO {
  id: number;           // Using number instead of Long, as TypeScript does not have a Long type
  name: string;        // The full name of the course type
  abbreviation: string; // Short form or abbreviation of the course type
  enabled: boolean;    // Indicates whether the course type is enabled or not
}
