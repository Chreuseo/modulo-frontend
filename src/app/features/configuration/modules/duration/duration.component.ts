import {Component, OnInit} from '@angular/core';
import {DurationDTO} from "../../../../core/models/duration-dto.model";
import {DurationService} from "../../../../core/services/duration.service";

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html'
})

export class DurationsComponent implements OnInit {
  durations: DurationDTO[] = [];
  newDurationName: string = '';

  constructor(private durationService: DurationService) {}

  ngOnInit(): void {
    this.loadDurations();
  }

  loadDurations(): void {
    this.durationService.getAllDurations().subscribe(durations => {
      this.durations = durations;
    });
  }

  deleteDuration(id: number): void {
    this.durationService.deleteDuration(id).subscribe(() => {
      this.loadDurations(); // Refresh the list after deletion
    });
  }

  addDuration(): void {
    if (this.newDurationName.trim()) {
      const newDuration: DurationDTO = { id: 0, name: this.newDurationName.trim() };
      this.durationService.addDuration(newDuration).subscribe(() => {
        this.loadDurations();
        this.newDurationName = ''; // Clear the input field
      });
    }
  }
}
