import { Component, OnInit } from '@angular/core';
import {MaternityProtectionDTO} from "../../../../core/models/maternity-protection-dto.model";
import {MaternityProtectionService} from "../../../../core/services/maternity-protection.service";


@Component({
  selector: 'app-maternity-protections',
  templateUrl: 'maternity-protection.component.html'
})
export class MaternityProtectionsComponent implements OnInit {
  maternityProtections: MaternityProtectionDTO[] = [];
  newMaternityProtectionName: string = '';

  constructor(private maternityProtectionService: MaternityProtectionService) {}

  ngOnInit(): void {
    this.loadMaternityProtections();
  }

  loadMaternityProtections(): void {
    this.maternityProtectionService.getAllMaternityProtections().subscribe(protections => {
      this.maternityProtections = protections;
    });
  }

  deleteMaternityProtection(id: number): void {
    this.maternityProtectionService.deleteMaternityProtection(id).subscribe(() => {
      this.loadMaternityProtections(); // Refresh the list after deletion
    });
  }

  addMaternityProtection(): void {
    if (this.newMaternityProtectionName.trim()) {
      const newProtection: MaternityProtectionDTO = { id: 0, name: this.newMaternityProtectionName.trim() };
      this.maternityProtectionService.addMaternityProtection(newProtection).subscribe(() => {
        this.loadMaternityProtections();
        this.newMaternityProtectionName = ''; // Clear the input field
      });
    }
  }
}
