import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpoDTO } from "../../../core/models/spo-dto.model";
import { DegreeDTO } from "../../../core/models/degree-dto.model";
import { SpoService } from "../../../core/services/spo.service";
import { DegreeService } from "../../../core/services/degree.service";
import { SectionService } from "../../../core/services/section.service";
import { ModuleTypeService } from "../../../core/services/module-type.service";
import { ModuleTypeDTO } from "../../../core/models/module-type-dto.model";
import { SectionDTO } from "../../../core/models/section-dto.model";
import {ExamTypeDTO} from "../../../core/models/exam-type-dto.model";
import {ExamTypeService} from "../../../core/services/exam-type.service";
import {ModuleRequirementService} from "../../../core/services/module-requirement.service";
import {ModuleRequirementDTO} from "../../../core/models/module-requirement-dto.model";
import {UserDTOFlat} from "../../../core/models/user-dto-flat.model";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-spo-detail-overview',
  templateUrl: './spo-detail-overview.component.html',
  styleUrls: ['../../../core/stylesheets/details.css',
    '../../../core/stylesheets/sub-nav.css',
    '../../../core/stylesheets/detail-table.css',
    '../../../core/stylesheets/formula.css',
    '../../../core/stylesheets/details.css']
})
export class SpoDetailOverviewComponent implements OnInit {
  spoId!: number;
  spo!: SpoDTO;
  degrees: DegreeDTO[] = [];
  isEditing: boolean = false;

  newSectionName: string = ''; // For new section input
  newModuleTypeName: string = ''; // For new module type input
  newExamTypeName: string = ''; // For new exam type input
  newExamTypeAbbreviation: string = ''; // For new exam type abbreviation input
  newExamTypeLength: string = ''; // For new exam type length input
  newModuleRequirementName: string = ''; // For new module requirement input

  userDTOs: UserDTOFlat[] = [];
  selectedUser!: UserDTOFlat; // To keep the currently selected lecturer to add


  constructor(
    private route: ActivatedRoute,
    private spoService: SpoService,
    private degreeService: DegreeService,
    private sectionService: SectionService,
    private moduleTypeService: ModuleTypeService,
    private examTypeService: ExamTypeService,
    private moduleRequirementService: ModuleRequirementService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const idValue = this.route.snapshot.paramMap.get('id');

    if (idValue) {
      const id = +idValue; // Convert to number
      this.loadSpoDetail(id);
      this.loadUserDTOs()
    } else {
      console.error('Spo ID not found in route parameters.');
    }
  }

  loadSpoDetail(id: number): void {
    this.spoService.getSpo(id).subscribe(spo => {
      this.spo = spo;
      this.updateIndices(); // Update indices whenever Spo is loaded
      this.loadDegrees()
    });
  }

  loadDegrees(): void {
    this.degreeService.getAllDegrees().subscribe(degrees => {
      console.log('Degrees retrieved:', degrees); // Log retrieved degrees
      this.degrees = degrees;
      if (this.spo.degree) {
        this.spo.degree = <DegreeDTO>this.degrees.find(degree => degree.id === this.spo.degree.id);
      }
    }, error => {
      console.error('Error loading degrees:', error);
    });
  }

  get sortedSections(): SectionDTO[] {
    return this.spo?.sectionDTOs?.slice().sort((a, b) => a.index - b.index) || [];
  }

  get sortedModuleTypes(): ModuleTypeDTO[] {
    return this.spo?.moduleTypeDTOs?.slice().sort((a, b) => a.index - b.index) || [];
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // When exiting edit mode, update indices for sections and module types
      this.updateIndices();
    }
  }

  save(): void {
    this.spoService.updateSpo(this.spo).subscribe(() => {
      this.isEditing = false;
      alert('Spo details updated successfully!');
    });
  }

  moveUp(index: number, list: any[]): void {
    if (index > 0) {
      const temp = list[index - 1];
      list[index - 1] = list[index];
      list[index] = temp;
      this.updateIndices(list);
    }
  }

  moveDown(index: number, list: any[]): void {
    if (index < list.length - 1) {
      const temp = list[index + 1];
      list[index + 1] = list[index];
      list[index] = temp;
      this.updateIndices(list);
    }
  }

  addSection(): void {
    if (this.newSectionName.trim() !== '') {
      const newSection: SectionDTO = {
        id: 0,  // ID will be generated
        index: this.spo.sectionDTOs.length, // Set index to the current length
        name: this.newSectionName,
        spoId: this.spo.id // Assuming there's a reference to spoId
      };

      this.sectionService.addSection(newSection).subscribe(
        (addedSection: SectionDTO) => {
          this.spo.sectionDTOs.push(addedSection);
          this.newSectionName = ''; // Clear input field after adding
          this.updateIndices(this.spo.sectionDTOs);
        },
        (error) => {
          console.error('Error adding section', error);
        }
      );
    }
  }

  addModuleType(): void {
    if (this.newModuleTypeName.trim() !== '') {
      const newModuleType: ModuleTypeDTO = {
        id: 0,
        index: this.spo.moduleTypeDTOs.length,
        name: this.newModuleTypeName,
        spoId: this.spo.id
      };

      this.moduleTypeService.addModuleType(newModuleType).subscribe(
        (addedModuleType: ModuleTypeDTO) => {
          this.spo.moduleTypeDTOs.push(addedModuleType);
          this.newModuleTypeName = ''; // Clear input field after adding
          this.updateIndices(this.spo.moduleTypeDTOs);
        },
        (error) => {
          console.error('Error adding module type', error);
        }
      );
    }
  }

  addExamType(): void {
    if (this.newExamTypeName.trim() !== '') {
      const newExamType: ExamTypeDTO = {
        id: 0, // ID will be generated
        name: this.newExamTypeName,
        abbreviation: this.newExamTypeAbbreviation, // Assuming abbreviation is optional or can be an empty string. Adjust as needed.
        length: this.newExamTypeLength, // Assuming length is optional or can be an empty string. Adjust as needed.
        description: '', // Setting default value; modify as per your requirements
        spoId: this.spo.id,
        enabled: true, // Setting default value; modify as per your requirements
        mandatory: false // Setting default value; modify as per your requirements
      };

      this.examTypeService.add(newExamType).subscribe((addedExamType: ExamTypeDTO) => {
        this.spo.examTypeDTOs.push(addedExamType);
        this.newExamTypeName = ''; // Clear input field after adding
        this.newExamTypeAbbreviation = ''; // Clear input field after adding
        this.newExamTypeLength = ''; // Clear input field
      }, (error) => {
        console.error('Error adding exam type', error);
      });
    }
  }


  updateIndices(list: any[] = this.spo.sectionDTOs): void {
    list.forEach((item, index) => {
      item.index = index; // Update index based on current order
    });
  }

  deleteSection(sectionId: number): void {
    this.sectionService.deleteSection(sectionId).subscribe(
      () => {
        this.spo.sectionDTOs = this.spo.sectionDTOs.filter(s => s.id !== sectionId); // Remove deleted section from UI
        console.log(`Section with id ${sectionId} deleted.`);
      },
      (error) => {
        console.error('Error deleting section:', error);
      }
    );
  }

  deleteModuleType(moduleTypeId: number): void {
    this.moduleTypeService.deleteModuleType(moduleTypeId).subscribe(
      () => {
        this.spo.moduleTypeDTOs = this.spo.moduleTypeDTOs.filter(m => m.id !== moduleTypeId); // Remove deleted module type from UI
        console.log(`Module type with id ${moduleTypeId} deleted.`);
      },
      (error) => {
        console.error('Error deleting module type:', error);
      }
    );
  }

  deleteExamType(examTypeId: number): void {
    this.examTypeService.remove(examTypeId).subscribe(() => {
      this.spo.examTypeDTOs = this.spo.examTypeDTOs.filter(e => e.id !== examTypeId); // Remove deleted exam type from UI
      console.log(`Exam type with id ${examTypeId} deleted.`);
    }, (error) => {
      console.error('Error deleting exam type:', error);
    });
  }

  // Add new methods for module requirements

  addModuleRequirement(): void {
    if (this.newModuleRequirementName.trim() !== '') {
      const newModReq: ModuleRequirementDTO = {
        id: 0,
        name: this.newModuleRequirementName,
        spoId: this.spo.id
      };

      this.moduleRequirementService.addModuleRequirement(newModReq).subscribe((addedRequirement: ModuleRequirementDTO) => {
        this.spo.moduleRequirementDTOs.push(addedRequirement);
        this.newModuleRequirementName = ''; // Clear input field after adding
      }, (error) => {
        console.error('Error adding module requirement', error);
      });
    }
  }

  deleteModuleRequirement(moduleRequirementId: number): void {
    this.moduleRequirementService.remove(moduleRequirementId).subscribe(
      () => {
        this.spo.moduleRequirementDTOs = this.spo.moduleRequirementDTOs.filter(m => m.id !== moduleRequirementId); // Remove deleted module requirement from UI
        console.log(`Module requirement with id ${moduleRequirementId} deleted.`);
      },
      (error) => {
        console.error('Error deleting module requirement:', error);
      }
    );
  }

  loadUserDTOs(): void {
    this.userService.getUsersByRole("SPO_ADMIN").subscribe(data => {
      this.userDTOs = data;
    });
  }

  addResponsibleUser(userId: number): void {
    this.spoService.addResponsibleUser(this.spo.id, userId).subscribe(() => {
      this.spo.responsibleUsers.push(this.userDTOs.find(user => user.id === userId)!);
    });
  }

  removeResponsibleUser(userId: number): void {
    this.spoService.removeResponsibleUser(this.spo.id, userId).subscribe(() => {
      this.spo.responsibleUsers = this.spo.responsibleUsers.filter(user => user.id !== userId);
    });
  }
}
