import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ModuleImplementationDTO} from "../../../core/models/module-implementation-dto.model";
import {ModuleImplementationService} from "../../../core/services/module-implementation.service";
import {SpoService} from "../../../core/services/spo.service";
import {ModuleFrameService} from "../../../core/services/module-frame.service";
import {SpoDTOFlat} from "../../../core/models/spo-dto-flat.model";
import {ModuleFrameSetDTO} from "../../../core/models/module-frame-set-dto.model";
import {ModuleRequirementDTO} from "../../../core/models/module-requirement-dto.model";
import {ModuleRequirementService} from "../../../core/services/module-requirement.service";
import {ExamTypeDTO} from "../../../core/models/exam-type-dto.model";
import {ExamTypeService} from "../../../core/services/exam-type.service";
import {ModuleFrameDTO} from "../../../core/models/module-frame-dto.model";
import {ModuleFrameModuleImplementationDTO} from "../../../core/models/module-frame-module-implementation-dto.model";
import {
  ModuleFrameModuleImplementationService
} from "../../../core/services/module-frame-module-implementation.service";
import {ModuleImplementationDTOFlat} from "../../../core/models/module-implementation-dto-flat.model";

@Component({
  selector: 'app-new-module-frame-module-implementation',
  templateUrl: './new-module-frame-module-implementation.component.html',
  styleUrls: ['../../../core/stylesheets/formula.css']
})
export class NewModuleFrameModuleImplementationComponent {
  moduleImplementationId!: number ;
  moduleImplementationDTOFlat!: ModuleImplementationDTOFlat;
  spos!: SpoDTOFlat[];
  moduleFrameSet: ModuleFrameSetDTO = { sections: [] };
  moduleRequirements: ModuleRequirementDTO[] = [];
  examTypes: ExamTypeDTO[] = [];
  selectedSpo: SpoDTOFlat | null = null;
  selectedModuleFrame: ModuleFrameDTO | null = null;
  selectedModuleRequirement: ModuleRequirementDTO | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleImplementationService: ModuleImplementationService,
    private spoService: SpoService,
    private moduleFrameService: ModuleFrameService,
    private moduleRequirementService: ModuleRequirementService,
    private examTypeService: ExamTypeService,
    private moduleFrameModuleImplementationService: ModuleFrameModuleImplementationService
  ) { }

  ngOnInit(): void {
    const idValue = this.route.snapshot.paramMap.get('id');
    this.moduleImplementationId = idValue ? +idValue : 0;
    this.loadModuleImplementation();
    this.loadSpos();
  }

  loadModuleImplementation(): void {
    this.moduleImplementationService.getFlatById(this.moduleImplementationId).subscribe(data => {
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
    this.router.navigate(['/module', this.moduleImplementationId]);
  }
}
