import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SpoService} from "../../../core/services/spo.service";
import {SpoDTOFlat} from "../../../core/models/spo-dto-flat.model";
import {DegreeDTO} from "../../../core/models/degree-dto.model";
import {DegreeService} from "../../../core/services/degree.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-spo',
  templateUrl: './new-spo.component.html',
  styleUrls: ['../../../core/stylesheets/formula.css']
})
export class NewSpoComponent implements OnInit {
  spoForm!: FormGroup; // Use definite assignment assertion
  degrees: DegreeDTO[] = []; // Declare an array to hold degree options

  constructor(private fb: FormBuilder,
              private spoService: SpoService,
              private degreeService: DegreeService, // Add the DegreeService
              private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadDegrees(); // Load degrees on initialization
  }

  private initializeForm() {
    this.spoForm = this.fb.group({
      id: [null], // Consider whether this should be stated or removed
      name: [''],
      degree: this.fb.group({
        id: [''], // Replace this with actual properties as needed
        // Add other DegreeDTO fields as necessary
      }),
      publication: [null],
      validFrom: [null],
      validUntil: [null],
    });
  }

  private loadDegrees() {
    this.degreeService.getAllDegrees().subscribe(
      (degrees) => {
        this.degrees = degrees; // Store fetched degrees
      },
      (error) => {
        console.error('Error fetching degrees', error);
        // Handle error as needed, such as showing a message to the user
      }
    );
  }

  // Added a method to handle the selection of degree
  onDegreeChange(event: any) {
    const selectedDegreeId = event.target.value; // Get selected degree ID
    const selectedDegree = this.degrees.find(degree => degree.id === +selectedDegreeId); // Find the full degree object
    this.spoForm.patchValue({ degree: selectedDegree }); // Patch the form with the full object
  }


  saveSpo(): void {
    const spoData: SpoDTOFlat = this.spoForm.value; // Get form values
    this.spoService.addSpo(spoData).subscribe()
  }

  discard() {
    this.spoForm.reset();
  }

  saveAndBack() {
    this.saveSpo();
    this.router.navigate(['/spo']).then(() => {
      window.location.reload();
    });
  }

  saveAndNew() {
    this.saveSpo();
    this.initializeForm(); // Reset the form for new entry
  }


  saveAndOpen(): void {
    const spoData: SpoDTOFlat = this.spoForm.value; // Get form values
    this.spoService.addSpo(spoData).subscribe(
      (response: SpoDTOFlat) => {
        response; // Assign response to newSpo
        console.log('Successfully saved:', response);

        // Navigate to the new route with the ID of the newly created SPO
        this.router.navigate(['/spo', response.id, 'overview']); // Use the ID from the response
      },
      (error) => {
        console.error('Error saving data', error);
        // Handle error (show an error message, etc.)
      }
    );
  }
}
