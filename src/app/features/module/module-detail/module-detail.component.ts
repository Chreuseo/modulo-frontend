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
import {ActivatedRoute, Router} from "@angular/router";
import {MaternityProtectionDTO} from "../../../core/models/maternity-protection-dto.model";
import {MaternityProtectionService} from "../../../core/services/maternity-protection.service";
import {
  ModuleFrameModuleImplementationService
} from "../../../core/services/module-frame-module-implementation.service";
import {ModuleFrameModuleImplementationDTO} from "../../../core/models/module-frame-module-implementation-dto.model";
import {UserService} from "../../../core/services/user.service";
import {UserDTOFlat} from "../../../core/models/user-dto-flat.model";
import {quillModules} from "../../../shared/components/quill-config";

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['../../../core/stylesheets/details.css',
    '../../../core/stylesheets/formula.css',
    '../../../core/stylesheets/module-frames.css']
})
export class ModuleDetailComponent implements OnInit {
  id: number = 0;
  moduleImplementation!: ModuleImplementationDTO;
  cycles: CycleDTO[] = [];
  durations: DurationDTO[] = [];
  languages: LanguageDTO[] = [];
  maternityProtection: MaternityProtectionDTO[] = [];
  userDTOs: UserDTOFlat[] = [];
  isEditing: boolean = false;
  moduleFrameModuleImplementations!: ModuleFrameModuleImplementationDTO[];
  selectedLecturer!: UserDTOFlat; // To keep the currently selected lecturer to add

  quillModules = quillModules;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: ModuleImplementationService,
    private cycleService: CycleService,
    private durationService: DurationService,
    private languageService: LanguageService,
    private maternityProtectionService: MaternityProtectionService,
    private moduleFrameModuleImplementationService: ModuleFrameModuleImplementationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const idValue = this.route.snapshot.paramMap.get('id');

    if (idValue) {
      this.id = +idValue;
      this.fetchModuleFrameModuleImplementations();
      this.loadCycles();
    } else {
      console.error('Spo ID not found in route parameters.');
    }
  }

  fetchModuleFrameModuleImplementations(): void {
    this.moduleFrameModuleImplementationService.getByModuleImplementationId(this.id).subscribe(data => {
      this.moduleFrameModuleImplementations = data;
    });
  }

  fetchModuleImplementation(): void {
    this.moduleService.getById(this.id).subscribe(data => {
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
      if (data.maternityProtection) {
        this.moduleImplementation.maternityProtection = this.maternityProtection.find(maternityProtection => maternityProtection.id === data.maternityProtection?.id) || null;
      }
      if (data.responsible) {
        this.moduleImplementation.responsible = this.userDTOs.find(user => user.id === data.responsible?.id) || null;
      }
      if (data.firstExaminant) {
        this.moduleImplementation.firstExaminant = this.userDTOs.find(user => user.id === data.firstExaminant?.id) || null;
      }
      if (data.secondExaminant) {
        this.moduleImplementation.secondExaminant = this.userDTOs.find(user => user.id === data.secondExaminant?.id) || null;
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
      this.loadMaternityProtection();
    });
  }

  loadMaternityProtection(): void {
    this.maternityProtectionService.getAllMaternityProtections().subscribe(data => {
      this.maternityProtection = data;
      this.loadUserDTOs();
    });
  }

  loadUserDTOs(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.userDTOs = data;
      this.fetchModuleImplementation();
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
    }
  }

  cancel(): void {
    this.fetchModuleImplementation(); // Re-fetch the original data
    this.toggleEdit();
  }

  navigateToNewModuleFrame(): void {
    this.router.navigate(['/module', this.id, 'new-module-frame']);
  }

  addLecturer(): void {
    if (this.selectedLecturer) {
      this.moduleService.addLecturer(this.id, this.selectedLecturer.id).subscribe(() => {
        this.fetchModuleImplementation(); // Refresh the module implementation to get updated lecturers
      });
    }
  }

  removeLecturer(lecturerId: number): void {
    this.moduleService.removeLecturer(this.id, lecturerId).subscribe(() => {
      this.fetchModuleImplementation(); // Refresh the module implementation to get updated lecturers
    });
  }

  deleteSpo(moduleFrameModuleImplementationId: number): void {
    this.moduleFrameModuleImplementationService.remove(moduleFrameModuleImplementationId).subscribe(() => {
      this.fetchModuleFrameModuleImplementations();
    });
  }

}
