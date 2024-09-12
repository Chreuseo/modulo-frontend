// module-requirement-dto.model.ts

export interface ModuleRequirementDTO {
  id: number;    // Using number for long
  spoId: number; // Using number for long, assuming SpoDTOFlat has a long id
  name: string;  // Name of the module requirement
}
