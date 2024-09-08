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

@Component({
  selector: 'app-spo-detail-overview',
  templateUrl: './spo-detail-overview.component.html',
  styleUrls: ['../../../core/stylesheets/details.css',
    '../../../core/stylesheets/sub-nav.css',
    '../../../core/stylesheets/exam-type-table.css']
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

  constructor(
    private route: ActivatedRoute,
    private spoService: SpoService,
    private degreeService: DegreeService,
    private sectionService: SectionService,
    private moduleTypeService: ModuleTypeService,
    private examTypeService: ExamTypeService
  ) { }

  ngOnInit(): void {
    const idValue = this.route.snapshot.paramMap.get('id');

    if (idValue) {
      const id = +idValue; // Convert to number
      this.loadSpoDetail(id);
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
        spoId: this.spo.id,
        enabled: true, // Setting default value; modify as per your requirements
        mandatory: false // Setting default value; modify as per your requirements
      };

      this.examTypeService.add(newExamType).subscribe((addedExamType: ExamTypeDTO) => {
        this.spo.examTypeDTOs.push(addedExamType);
        this.newExamTypeName = ''; // Clear input field after adding
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
}
