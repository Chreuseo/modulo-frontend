// new-module.component.ts

import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ModuleImplementationService} from "../../../core/services/module-implementation.service";
import {ModuleImplementationDTOFlat} from "../../../core/models/module-implementation-dto-flat.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-module',
  templateUrl: './new-module.component.html',
  styleUrls: ['../../../core/stylesheets/formula.css']})
export class NewModuleComponent implements OnInit {
  moduleForm!: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private moduleService: ModuleImplementationService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.moduleForm = this.fb.group({
      id: 0,
      name: [''],
      abbreviation: [''],
    });
  }

  saveModule(){
    const module: ModuleImplementationDTOFlat = this.moduleForm.value;
    this.moduleService.addModuleImplementation(module).subscribe(
      (response) => {
        console.log('Module added successfully', response);
        // Handle success as needed, such as showing a success message
      },
      (error) => {
        console.error('Error adding module', error);
        // Handle error as needed, such as showing an error message
      })
  }

  saveAndNew() {
    this.saveModule();
    this.moduleForm.reset();
  }

  discard() {
    this.moduleForm.reset();
  }

  saveAndOpen() {
    const module: ModuleImplementationDTOFlat = this.moduleForm.value;
    this.moduleService.addModuleImplementation(module).subscribe(
      (response: ModuleImplementationDTOFlat) => {
        console.log('Module added successfully', response);
        this.router.navigate(['/module', response.id]); // Use the ID from the response

        // Handle success as needed, such as showing a success message
      },
      (error) => {
        console.error('Error adding module', error);
        // Handle error as needed, such as showing an error message
      })
    // Navigate to the module details page
  }

  saveAndBack() {
    this.saveModule();
    this.router.navigate(['/module']);
    // Navigate back to the module list page
  }
}
