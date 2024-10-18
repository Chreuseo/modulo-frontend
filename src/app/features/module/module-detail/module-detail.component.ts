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
import {SpoDTOFlat} from "../../../core/models/spo-dto-flat.model";
import {ModuleFrameSetDTO} from "../../../core/models/module-frame-set-dto.model";
import {ModuleRequirementDTO} from "../../../core/models/module-requirement-dto.model";
import {ExamTypeDTO} from "../../../core/models/exam-type-dto.model";
import {ModuleFrameDTO} from "../../../core/models/module-frame-dto.model";
import {ModuleImplementationDTOFlat} from "../../../core/models/module-implementation-dto-flat.model";
import {SpoService} from "../../../core/services/spo.service";
import {ModuleFrameService} from "../../../core/services/module-frame.service";
import {ModuleRequirementService} from "../../../core/services/module-requirement.service";
import {ExamTypeService} from "../../../core/services/exam-type.service";

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
  moduleImplementationDTOFlat!: ModuleImplementationDTOFlat;
  cycles: CycleDTO[] = [];
  durations: DurationDTO[] = [];
  languages: LanguageDTO[] = [];
  maternityProtection: MaternityProtectionDTO[] = [];
  userDTOs: UserDTOFlat[] = [];
  isEditing: boolean = false;
  isAddingModuleFrame = false;
  moduleFrameModuleImplementations!: ModuleFrameModuleImplementationDTO[];
  selectedLecturer!: UserDTOFlat; // To keep the currently selected lecturer to add

  spos!: SpoDTOFlat[];
  moduleFrameSet: ModuleFrameSetDTO = { sections: [] };
  moduleRequirements: ModuleRequirementDTO[] = [];
  examTypes: ExamTypeDTO[] = [];
  selectedSpo: SpoDTOFlat | null = null;
  selectedModuleFrame: ModuleFrameDTO | null = null;
  selectedModuleRequirement: ModuleRequirementDTO | null = null;

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
    private userService: UserService,
    private moduleImplementationService: ModuleImplementationService,
    private spoService: SpoService,
    private moduleFrameService: ModuleFrameService,
    private moduleRequirementService: ModuleRequirementService,
    private examTypeService: ExamTypeService,
  ) {}

  ngOnInit(): void {
    const idValue = this.route.snapshot.paramMap.get('id');

    if (idValue) {
      this.id = +idValue;
      this.fetchModuleFrameModuleImplementations();
      this.loadCycles();
      this.loadModuleImplementation();
      this.loadSpos();
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

  loadModuleImplementation(): void {
    this.moduleImplementationService.getFlatById(this.id).subscribe(data => {
      this.moduleImplementationDTOFlat = data;
    }, error => {
      console.error('Error loading ModuleImplementationDTO: ', error);
    });
  }

  loadSpos(): void {
    this.spoService.getAll().subscribe(data => {
      this.spos = data;
    }, error => {
      console.error('Error loading SPOs: ', error);
    });
  }

  loadModuleFrameSet(spoId: number): void {
    this.moduleFrameService.getModuleFrameSetBySpoId(spoId).subscribe(moduleFrameSet => {
      this.moduleFrameSet = moduleFrameSet;
      this.selectedModuleFrame = this.moduleFrameSet.sections[0].moduleTypes[0].moduleFrames[0];
      this.onModuleFrameChange()
    }, error => {
      console.error('Error loading ModuleFrameSetDTO: ', error);
    });
  }

  loadModuleRequirements(spoId: number): void {
    this.moduleRequirementService.getBySpoId(spoId).subscribe(data => {
      this.moduleRequirements = data;
    }, error => {
      console.error('Error loading ModuleRequirements: ', error);
    });
  }

  loadExamTypes(moduleFrameId: number): void {
    this.examTypeService.getByModuleFrame(moduleFrameId).subscribe(data => {
      this.examTypes = data;
    }, error => {
      console.error('Error loading ExamTypes: ', error);
    });
  }

  onSpoChange(): void {
    if (this.selectedSpo) {
      this.loadModuleFrameSet(this.selectedSpo.id);
      this.loadModuleRequirements(this.selectedSpo.id);
    }
  }

  onModuleFrameChange(): void {
    if (this.selectedModuleFrame) {
      this.loadExamTypes(this.selectedModuleFrame.id);
    }
  }

  addModuleFrame(): void {
    this.moduleFrameModuleImplementationService.add({
      id: 0,
      moduleFrameDTO: this.selectedModuleFrame!,
      moduleImplementationDTOFlat: this.moduleImplementationDTOFlat,
      examTypeDTOs: this.examTypes,
      moduleRequirementDTO: this.selectedModuleRequirement
    }).subscribe(data => {
      console.debug(data)
      console.log('ModuleFrame added successfully.');
    }, error => {
      console.error('Error adding ModuleFrame: ', error);
    });
  }

  onSave(): void {
    this.addModuleFrame();
  }


}
