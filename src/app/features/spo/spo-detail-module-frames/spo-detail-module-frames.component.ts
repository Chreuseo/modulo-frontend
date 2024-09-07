import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpoService } from '../../../core/services/spo.service';
import { ModuleFrameService } from '../../../core/services/module-frame.service';
import { SpoDTO } from '../../../core/models/spo-dto.model';
import { ModuleFrameSetDTO } from "../../../core/models/module-frame-set-dto.model";
import { ModuleFrameDTO } from "../../../core/models/module-frame-dto.model";

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
  newModuleFrames: { [key: number]: ModuleFrameDTO } = {}; // Separate newModuleFrame for each moduleType
  isAddingModuleFrame: { [key: number]: boolean } = {}; // Track display of additional input fields for each moduleType

  constructor(
    private route: ActivatedRoute,
    private spoService: SpoService,
    private moduleFrameService: ModuleFrameService,
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
      this.initializeNewModuleFrame(); // Initialize newModuleFrame after fetching the SPO
    });
  }

  loadModuleFrameSet(spoId: number): void {
    this.moduleFrameService.getModuleFrameSetBySpoId(spoId).subscribe(moduleFrameSet => {
      this.moduleFrameSet = moduleFrameSet;
      // Initialize isAddingModuleFrame for each module type
      this.moduleFrameSet.sections.forEach(section => {
        section.moduleTypes.forEach(moduleType => {
          this.isAddingModuleFrame[moduleType.id] = false; // Initialize to false for all module types
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
      quantity: 0,
      name: '',
      sws: 0,
      courseType: '',
      weight: 0,
      credits: 0,
      allExamsMandatory: false,
    };
  }

  toggleAddModuleFrame(moduleTypeId: number): void {
    this.isAddingModuleFrame[moduleTypeId] = !this.isAddingModuleFrame[moduleTypeId];
    if (!this.isAddingModuleFrame[moduleTypeId]) {
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
      quantity: 0,
      name: '',
      sws: 0,
      courseType: '',
      weight: 0,
      credits: 0,
      allExamsMandatory: false,
    };
  }

  navigateToNewModuleFrame(): void {
    // Navigate to the new route for adding a new Module Frame
    this.router.navigate(['/module-frame/new', this.spo.id]); // Use the ID from the response
  }
}
