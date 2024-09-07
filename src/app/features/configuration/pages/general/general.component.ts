import { Component, OnInit } from '@angular/core';
import {DegreeDTO} from "../../../../core/models/degree-dto.model";
import {DegreeService} from "../../../../core/services/degree.service";
import {LanguageDTO} from "../../../../core/models/language-dto.model";
import {LanguageService} from "../../../../core/services/language.service";
import {DurationService} from "../../../../core/services/duration.service";
import {DurationDTO} from "../../../../core/models/duration-dto.model";
import {MaternityProtectionDTO} from "../../../../core/models/maternity-protection-dto.model";
import {MaternityProtectionService} from "../../../../core/services/maternity-protection.service";

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


  constructor(private degreeService: DegreeService,
              private languageService: LanguageService,
              private durationService: DurationService,
              private maternityProtectionService: MaternityProtectionService,
              ) {}

  ngOnInit(): void {
    this.loadDegrees();
    this.loadLanguages();
    this.loadDurations();
    this.loadMaternityProtections();
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
}
