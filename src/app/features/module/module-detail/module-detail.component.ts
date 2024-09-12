// src/app/module-detail/module-detail.component.ts

import { Component, OnInit } from '@angular/core';
import {ModuleImplementationDTO} from "../../../core/models/module-implementation-dto.model";
import {CycleDTO} from "../../../core/models/cycle-dto.model";
import {DurationDTO} from "../../../core/models/duration-dto.model";
import {LanguageDTO} from "../../../core/models/language-dto.model";
import {ModuleImplementationService} from "../../../core/services/module-implementation.service";
import {CycleService} from "../../../core/services/cycle.service";
import {DurationService} from "../../../core/services/duration.service";
import {LanguageService} from "../../../core/services/language.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['../../../core/stylesheets/details.css']
})
export class ModuleDetailComponent implements OnInit {
  id: number = 0;
  moduleImplementation: ModuleImplementationDTO | null = null;
  cycles: CycleDTO[] = [];
  durations: DurationDTO[] = [];
  languages: LanguageDTO[] = [];
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleImplementationService,
    private cycleService: CycleService,
    private durationService: DurationService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    const idValue = this.route.snapshot.paramMap.get('id');

    if (idValue) {
      this.id = +idValue;
      this.loadCycles();
    } else {
      console.error('Spo ID not found in route parameters.');
    }
  }

  fetchModuleImplementation(id: number): void {
    this.moduleService.getById(id).subscribe(data => {
      // Assign fetched data
      this.moduleImplementation = data;

      // Find the full objects for cycle, duration, and language
      if (data.cycle) {
        this.moduleImplementation.cycle = this.cycles.find(cycle => cycle.id === data.cycle?.id) || null;
      }
      if (data.duration) {
        this.moduleImplementation.duration = this.durations.find(duration => duration.id === data.duration?.id) || null;
      }
      if (data.language) {
        this.moduleImplementation.language = this.languages.find(language => language.id === data.language?.id) || null;
      }
    });
  }

  loadCycles(): void {
    this.cycleService.getAllCycles().subscribe(data => {
      this.cycles = data;
      this.loadDurations();
    });
  }

  loadDurations(): void {
    this.durationService.getAllDurations().subscribe(data => {
      this.durations = data;
      this.loadLanguages();
    });
  }

  loadLanguages(): void {
    this.languageService.getAllLanguages().subscribe(data => {
      this.languages = data;
      this.fetchModuleImplementation(this.id);
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  save(): void {
    if (this.moduleImplementation) {
      this.moduleService.updateModuleImplementation(this.moduleImplementation).subscribe(() => {
        this.toggleEdit(); // Exit edit mode after saving
      });
      this.toggleEdit(); // Exit edit mode after saving
    }
  }

  cancel(): void {
    this.fetchModuleImplementation(1); // Re-fetch the original data
    this.toggleEdit();
  }
}
