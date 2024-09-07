import {ModuleFrameDTO} from "./module-frame-dto.model";

export interface ModuleFrameSetDTO {
  sections: Section[];
}

export interface Section {
  id: number;             // Use number for Long
  index: number;
  name: string;
  moduleTypes: ModuleType[]; // List of ModuleTypes for this Section
}

export interface ModuleType {
  id: number;             // Use number for long
  index: number;
  name: string;
  moduleFrames: ModuleFrameDTO[]; // List of ModuleFrames for this ModuleType
}
