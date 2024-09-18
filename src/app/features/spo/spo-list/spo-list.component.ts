import { Component, OnInit } from '@angular/core';
import { SpoService } from '../../../core/services/spo.service'; // Adjust the path as necessary
import { SpoDTOFlat } from '../../../core/models/spo-dto-flat.model';
import {Router} from "@angular/router"; // Adjust the path as necessary

@Component({
  selector: 'app-spo-list',
  templateUrl: './spo-list.component.html',
  styleUrls: ['../../../core/stylesheets/list-view.css']
})
export class SpoListComponent implements OnInit {
  public spoList: SpoDTOFlat[] = [];
  public sortedBy: string = '';
  public sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private spoService: SpoService,
              private router: Router) {}

  ngOnInit(): void {
    this.loadSpoData();
  }

  loadSpoData(): void {
    this.spoService.getAll().subscribe(
      (data: SpoDTOFlat[]) => {
        this.spoList = data;
      },
      (error) => {
        console.error('Error fetching SPO data:', error);
      }
    );
  }

  sortBy(field: string) {
    if (this.sortedBy === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'; // Toggle the direction
    } else {
      this.sortedBy = field;
      this.sortDirection = 'asc'; // Default to ascending
    }

    this.spoList.sort((a, b) => {
      const aValue = (a as any)[this.sortedBy];
      const bValue = (b as any)[this.sortedBy];

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  navigateToNewSpo() {
    this.router.navigate(['/spo/new']);
  }

  navigateToSpoDetail(id: number): void {
    this.router.navigate([`/spo/${id}/overview`]); // Update the route to your SPO detail path
  }
}
