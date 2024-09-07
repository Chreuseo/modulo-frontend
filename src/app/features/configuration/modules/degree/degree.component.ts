import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DegreeDTO} from "../../../../core/models/degree-dto.model";
import {DegreeService} from "../../../../core/services/degree.service";

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html'
})
@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
})
export class DegreesComponent implements OnInit {
  degrees: DegreeDTO[] = [];
  newDegreeName: string = '';

  @Output() degreesUpdated = new EventEmitter<void>(); // Emit an event to notify parent component

  constructor(private degreeService: DegreeService) {}

  ngOnInit(): void {
    this.loadDegrees();
  }

  loadDegrees(): void {
    this.degreeService.getAllDegrees().subscribe(degrees => {
      this.degrees = degrees;
    });
  }

  deleteDegree(id: number): void {
    this.degreeService.deleteDegree(id).subscribe(() => {
      this.loadDegrees();
      this.degreesUpdated.emit(); // Notify parent component
    });
  }

  addDegree(): void {
    if (this.newDegreeName.trim()) {
      const newDegree: DegreeDTO = { id: 0, name: this.newDegreeName.trim() };
      this.degreeService.addDegree(newDegree).subscribe(() => {
        this.loadDegrees();
        this.newDegreeName = ''; // Clear the input field
        this.degreesUpdated.emit(); // Notify parent component
      });
    }
  }
}
