import { Component, OnInit } from '@angular/core';
import {DegreeDTO} from "../../../../core/models/degree-dto.model";
import {DegreeService} from "../../../../core/services/degree.service";
import {LanguageDTO} from "../../../../core/models/language-dto.model";
import {LanguageService} from "../../../../core/services/language.service";
import {DurationService} from "../../../../core/services/duration.service";
import {DurationDTO} from "../../../../core/models/duration-dto.model";
import {MaternityProtectionDTO} from "../../../../core/models/maternity-protection-dto.model";
import {MaternityProtectionService} from "../../../../core/services/maternity-protection.service";
import {CourseTypeDTO} from "../../../../core/models/course-type-dto.model";
import {CourseTypeService} from "../../../../core/services/course-type.service";
import {CycleDTO} from "../../../../core/models/cycle-dto.model";
import {CycleService} from "../../../../core/services/cycle.service";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['../../../../core/stylesheets/settings.css']
})
export class GeneralComponent implements OnInit {
  degrees: DegreeDTO[] = [];
  newDegreeName: string = '';

  languages: LanguageDTO[] = [];
  newLanguageName: string = '';

  durations: DurationDTO[] = [];
  newDurationName: string = '';

  maternityProtections: MaternityProtectionDTO[] = [];
  newMaternityProtectionName: string = '';

  courseTypes: CourseTypeDTO[] = [];
  newCourseTypeName: string = '';
  newCourseTypeAbbreviation: string = '';

  cycles: CycleDTO[] = [];
  newCycleName: string = '';


  constructor(private degreeService: DegreeService,
              private languageService: LanguageService,
              private durationService: DurationService,
              private maternityProtectionService: MaternityProtectionService,
              private courseTypeService: CourseTypeService,
              private cycleService: CycleService
              ) {}

  ngOnInit(): void {
    this.loadDegrees();
    this.loadLanguages();
    this.loadDurations();
    this.loadMaternityProtections();
    this.loadCourseTypes();
    this.loadCycles();
  }

  loadDegrees(): void {
    this.degreeService.getAllDegrees().subscribe(degrees => {
      this.degrees = degrees;
    });
  }

  deleteDegree(id: number): void {
    this.degreeService.deleteDegree(id).subscribe(() => {
      this.loadDegrees(); // Refresh the list after deletion
    });
  }

  addDegree(): void {
    if (this.newDegreeName.trim()) {
      const newDegree: DegreeDTO = { id: 0, name: this.newDegreeName.trim() };
      this.degreeService.addDegree(newDegree).subscribe(() => {
        this.loadDegrees();
        this.newDegreeName = ''; // Clear the input field
      });
    }
  }

  // Load language
  loadLanguages(): void {
    this.languageService.getAllLanguages().subscribe(languages => {
      this.languages = languages;
    });
  }

  // Delete language
  deleteLanguage(id: number): void {
    this.languageService.deleteLanguage(id).subscribe(() => {
      this.loadLanguages(); // Refresh the list after deletion
    });
  }

  // Add language
  addLanguage(): void {
    if (this.newLanguageName.trim()) {
      const newLanguage: LanguageDTO = { id: 0, name: this.newLanguageName.trim() };
      this.languageService.addLanguage(newLanguage).subscribe(() => {
        this.loadLanguages();
        this.newLanguageName = ''; // Clear the input field
      });
    }
  }

  // Load durations
  loadDurations(): void {
    this.durationService.getAllDurations().subscribe(durations => {
      this.durations = durations;
    });
  }

  // Add duration
  addDuration(): void {
    if (this.newDurationName.trim()) {
      const newDuration: DurationDTO = { id: 0, name: this.newDurationName.trim() };
      this.durationService.addDuration(newDuration).subscribe(() => {
        this.loadDurations();
        this.newDurationName = ''; // Clear the input field
      });
    }
  }

  // Delete duration
  deleteDuration(id: number): void {
    this.durationService.deleteDuration(id).subscribe(() => {
      this.loadDurations(); // Refresh the list after deletion
    });
  }

  loadMaternityProtections(): void {
    this.maternityProtectionService.getAllMaternityProtections().subscribe(protections => {
      this.maternityProtections = protections;
    });
  }

  addMaternityProtection(): void {
    if (this.newMaternityProtectionName.trim()) {
      const newProtection: MaternityProtectionDTO = { id: 0, name: this.newMaternityProtectionName.trim() };
      this.maternityProtectionService.addMaternityProtection(newProtection).subscribe(() => {
        this.loadMaternityProtections();
        this.newMaternityProtectionName = ''; // Clear the input field
      });
    }
  }

  deleteMaternityProtection(id: number): void {
    this.maternityProtectionService.deleteMaternityProtection(id).subscribe(() => {
      this.loadMaternityProtections(); // Refresh the list after deletion
    });
  }

  loadCourseTypes(): void {
    this.courseTypeService.getAllCourseTypes().subscribe(types => {
      this.courseTypes = types;
    });
  }

  addCourseType(): void {
    if (this.newCourseTypeName.trim()) {
      const newType: CourseTypeDTO = { id: 0, name: this.newCourseTypeName.trim() , abbreviation: this.newCourseTypeAbbreviation.trim(), enabled: false};
      this.courseTypeService.addCourseType(newType).subscribe(() => {
        this.loadCourseTypes();
        this.newCourseTypeName = ''; // Clear the input field
        this.newCourseTypeAbbreviation = ''; // Clear the input field
      });
    }
  }

  deleteCourseType(id: number): void {
    this.courseTypeService.deleteCourseType(id).subscribe(() => {
      this.loadCourseTypes(); // Refresh the list after deletion
    });
  }

  loadCycles(): void {
    this.cycleService.getAllCycles().subscribe(cycles => {
      this.cycles = cycles;
    });
  }

  addCycle(): void {
    if (this.newCycleName.trim()) {
      const newCycle: CycleDTO = { id: 0, name: this.newCycleName.trim() };
      this.cycleService.addCycle(newCycle).subscribe(() => {
        this.loadCycles();
        this.newCycleName = ''; // Clear the input field
      });
    }
  }

  deleteCycle(id: number): void {
    this.cycleService.deleteCycle(id).subscribe(() => {
      this.loadCycles(); // Refresh the list after deletion
    });
  }
}
