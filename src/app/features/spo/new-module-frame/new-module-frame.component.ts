import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ModuleFrameService } from '../../../core/services/module-frame.service';
import { ModuleFrameDTO } from '../../../core/models/module-frame-dto.model';
import {SpoService} from "../../../core/services/spo.service";
import {SpoDTO} from "../../../core/models/spo-dto.model";
import {SectionDTO} from "../../../core/models/section-dto.model";
import {ModuleTypeDTO} from "../../../core/models/module-type-dto.model"; // Adjust the path

@Component({
  selector: 'app-new-module-frame',
  templateUrl: './new-module-frame.component.html',
  styleUrls: ['../../../core/stylesheets/formula.css']
})
export class NewModuleFrameComponent implements OnInit {
  spoId!: number;
  spo!: SpoDTO;
  sectionDTOs: SectionDTO[] = []; // List of section DTOs
  moduleTypeDTOs: ModuleTypeDTO[] = []; // List of module type DTOs

  moduleFrame: ModuleFrameDTO = {
    id: 0,
    spoDTOFlat: this.spo,
    section: null!,
    moduleType: null!,
    quantity: 0,
    name: '',
    sws: 0,
    courseTypes: [],
    examTypes: [],
    weight: 0,
    credits: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private moduleFrameService: ModuleFrameService,
    private spoService: SpoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.spoId = +params['spoId'];
      this.loadSpoDetail(this.spoId); // Fetch the SPO based on the given ID
    });
  }

  loadSpoDetail(spoId: number): void {
    this.spoService.getSpo(spoId).subscribe(spo => {
      this.spo = spo;
      this.moduleFrame.spoDTOFlat = this.spo; // Set the SPO ID for the module frame
      this.sectionDTOs = this.spo.sectionDTOs; // Populate sectionDTOs from the SPO
      this.moduleTypeDTOs = this.spo.moduleTypeDTOs; // Populate moduleTypeDTOs from the SPO
    });
  }

  saveModuleFrame(): void {
    this.moduleFrameService.addModuleFrame(this.moduleFrame).subscribe({
      next: (addedFrame) => {
        console.log('Module Frame saved:', addedFrame);
        this.router.navigate(['/module-frames', addedFrame.id]); // Navigate to a specific route if needed
        this.resetForm()
      },
      error: (err) => {
        console.error('Error saving Module Frame:', err);
      }
    });
  }

  saveAndOpen(): void {
    this.saveModuleFrame();
    // Logic to possibly redirect immediately after save
  }

  back(): void {
    this.router.navigate(['/spo', this.spoId, 'module-frames']); // Adjust to the route you want to return to
  }

  resetForm(): void {
    this.moduleFrame = {
      id: 0,
      spoDTOFlat: this.spo,
      section: null!,
      moduleType: null!,
      examTypes: null!,
      quantity: 0,
      name: '',
      sws: 0,
      courseTypes: [],
      weight: 0,
      credits: 0,};
  }
}
