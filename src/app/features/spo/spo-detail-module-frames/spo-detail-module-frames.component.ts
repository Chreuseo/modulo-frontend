import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpoService } from '../../../core/services/spo.service';
import { ModuleFrameService } from '../../../core/services/module-frame.service';
import { SpoDTO } from '../../../core/models/spo-dto.model';
import { ModuleFrameSetDTO } from "../../../core/models/module-frame-set-dto.model";
import { ModuleFrameDTO } from "../../../core/models/module-frame-dto.model";
import {CourseTypeDTO} from "../../../core/models/course-type-dto.model";
import {CourseTypeService} from "../../../core/services/course-type.service";
import {ExamTypeDTO} from "../../../core/models/exam-type-dto.model";
import {ExamTypeService} from "../../../core/services/exam-type.service";

@Component({
  selector: 'app-spo-detail-module-frames',
  templateUrl: './spo-detail-module-frames.component.html',
  styleUrls: [
    '../../../core/stylesheets/module-frames.css',
    '../../../core/stylesheets/sub-nav.css'
  ]
})
export class SpoDetailModuleFramesComponent implements OnInit {
  spo!: SpoDTO;
  moduleFrameSet!: ModuleFrameSetDTO;
  newModuleFrame!: ModuleFrameDTO; // Initialize as undefined and create after loading SPO
  courseTypes: CourseTypeDTO[] = []; // store the fetched course types
  examTypes: ExamTypeDTO[] = []
  isAddingModuleFrame: { [sectionId: number]: { [moduleTypeId: number]: boolean } } = {};
  constructor(
    private route: ActivatedRoute,
    private spoService: SpoService,
    private moduleFrameService: ModuleFrameService,
    private courseTypeService: CourseTypeService, // Inject the Course
    private examTypeService: ExamTypeService, // Inject the ExamType
    private router: Router // For navigation purposes
  ) {}

  ngOnInit(): void {
    const idValue = this.route.snapshot.paramMap.get('id');
    if (idValue) {
      const id = +idValue; // Convert to number
      this.loadSpoDetail(id);
      this.loadModuleFrameSet(id);
    } else {
      console.error('Spo ID not found in route parameters.');
    }
  }

  loadSpoDetail(id: number): void {
    this.spoService.getSpo(id).subscribe(spo => {
      this.spo = spo;
      this.loadCourseTypes(); // Load course types
    });
  }

  loadModuleFrameSet(spoId: number): void {
    this.moduleFrameService.getModuleFrameSetBySpoId(spoId).subscribe(moduleFrameSet => {
      this.moduleFrameSet = moduleFrameSet;

      // Initialize isAddingModuleFrame as a nested object
      this.isAddingModuleFrame = {}; // Reset it at the beginning

      // Iterate through sections and module types to configure the nested structure
      this.moduleFrameSet.sections.forEach(section => {
        this.isAddingModuleFrame[section.id] = {}; // Initialize the section key
        section.moduleTypes.forEach(moduleType => {
          this.isAddingModuleFrame[section.id][moduleType.id] = false; // Initialize to false for each module type
        });
      });
    });
  }

  initializeNewModuleFrame(): void {
    this.newModuleFrame = {
      id: 0,
      spoId: this.spo.id, // Use the fetched spo object
      section: null!,
      moduleType: null!,
      quantity: 1,
      name: '',
      courseTypes: this.courseTypes,
      examTypes: this.examTypes,
      sws: 4,
      weight: 4,
      credits: 5,
    };
  }

  toggleAddModuleFrame(sectionId: number, moduleTypeId: number): void {
    // Check if sectionId exists, if not initialize it
    if (!this.isAddingModuleFrame[sectionId]) {
      this.isAddingModuleFrame[sectionId] = {};
    }

    // Toggle the specific moduleTypeId within the given sectionId
    this.isAddingModuleFrame[sectionId][moduleTypeId] = !this.isAddingModuleFrame[sectionId][moduleTypeId];

    if (!this.isAddingModuleFrame[sectionId][moduleTypeId]) {
      // Reset newModuleFrame when cancelled
      this.resetNewModuleFrame();
    }
  }

  addModuleFrame(moduleTypeId: number, sectionId: number): void {
    this.newModuleFrame.moduleType = { id: moduleTypeId } as any; // Type assertions for ModuleTypeDTO
    this.newModuleFrame.section = { id: sectionId } as any; // Type assertions for SectionDTO

    this.moduleFrameService.addModuleFrame(this.newModuleFrame).subscribe({
      next: (addedFrame) => {
        this.loadModuleFrameSet(this.spo.id); // Reload the module frame set to reflect the changes
        this.resetNewModuleFrame();
      },
      error: (err) => {
        console.error('Error adding ModuleFrame:', err);
      }
    });
  }

  resetNewModuleFrame(): void {
    this.newModuleFrame = {
      id: 0,
      spoId: this.spo.id, // Use the fetched spo to initialize
      section: null!,
      moduleType: null!,
      quantity: 1,
      name: '',
      sws: 4,
      courseTypes: this.courseTypes,
      examTypes: this.examTypes,
      weight: 4,
      credits: 5
    };
  }

  navigateToNewModuleFrame(): void {
    // Navigate to the new route for adding a new Module Frame
    this.router.navigate(['/module-frame/new', this.spo.id]); // Use the ID from the response
  }

  loadCourseTypes(): void {
    this.courseTypeService.getAllCourseTypes().subscribe(courseTypes => {
      this.courseTypes = courseTypes; // Store the fetched course types
      this.loadExamTypes(); // Initialize newModuleFrame after fetching the SPO
    });
  }

  loadExamTypes(): void {
    this.examTypeService.getBySpo(this.spo.id).subscribe(examTypes => {
      this.examTypes = examTypes; // Store the fetched exam types
      this.initializeNewModuleFrame(); // Initialize newModuleFrame after fetching the SPO
    });
  }
}
