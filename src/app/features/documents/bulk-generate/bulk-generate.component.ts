import {Component, OnInit} from '@angular/core';
import {DocumentGenerationBulkDTO} from "../../../core/models/document-generation-bulk-dto.model";
import {SpoDTOFlat} from "../../../core/models/spo-dto-flat.model";
import {SpoService} from "../../../core/services/spo.service";
import {DocumentService} from "../../../core/services/document.service";
import {SemesterDTO} from "../../../core/models/semester-dto.model";
import {SemesterService} from "../../../core/services/semester.service";

@Component({
  selector: 'app-bulk-generate',
  templateUrl: './bulk-generate.component.html',
  styleUrls: ['../../../core/stylesheets/details.css',
    '../../../core/stylesheets/sub-nav.css']
})
export class BulkGenerateComponent implements OnInit {
  spoItems: SpoDTOFlat[] = [];
  selectedSpos: number[] = [];
  semesters: SemesterDTO[] = [];
  selectedSemester?: SemesterDTO;
  moduleManualChecked = false;
  studyGuideChecked = false;
  spoChecked = false;
  allSelected = false;

  constructor(
    private spoService: SpoService,
    private documentService: DocumentService,
    private semesterService: SemesterService
  ) {}

  ngOnInit(): void {
    this.loadSpos();
    this.loadSemesters();
  }

  loadSpos(): void {
    this.spoService.getAll().subscribe(data => {
      this.spoItems = data;
    });
  }

  loadSemesters(): void {
    this.semesterService.getAllSemesters().subscribe(data => {
      this.semesters = data;
      if (this.semesters.length) {
        this.selectedSemester = this.semesters[0]; // Select a default semester, if any
      }
    });
  }

  toggleSelectAll(): void {
    this.allSelected = !this.allSelected;
    this.selectedSpos = !this.allSelected ? this.spoItems.map(spo => spo.id) : [];
  }

  isSpoSelected(id: number): boolean {
    return this.selectedSpos.includes(id);
  }

  toggleSpoSelection(id: number): void {
    if (this.selectedSpos.includes(id)) {
      this.selectedSpos = this.selectedSpos.filter(selectedId => selectedId !== id);
    } else {
      this.selectedSpos.push(id);
    }
  }

  generateDocuments(): void {
    if (!this.selectedSemester) {
      console.error('No semester selected');
      return;
    }

    const dto: DocumentGenerationBulkDTO = {
      spoDTOFlatList: this.spoItems.filter(spo => this.selectedSpos.includes(spo.id)),
      semesterDTO: this.selectedSemester,
      studyGuide: this.studyGuideChecked,
      moduleManual: this.moduleManualChecked,
      spo: this.spoChecked
    };

    this.documentService.generateBulkDocument(dto).subscribe(() => {
      console.log('Documents generated successfully');
      // Handle successful generation, e.g., show a notification
    }, error => {
      console.error('Error generating documents', error);
      // Handle error, e.g., show an error message
    });
  }
}
