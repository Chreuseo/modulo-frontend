import {Component, OnInit} from '@angular/core';
import {SpoDTOFlat} from "../../../core/models/spo-dto-flat.model";
import {SemesterDTO} from "../../../core/models/semester-dto.model";
import {SpoService} from "../../../core/services/spo.service";
import {SemesterService} from "../../../core/services/semester.service";
import {DocumentService} from "../../../core/services/document.service";

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['../../../core/stylesheets/details.css',
    '../../../core/stylesheets/sub-nav.css']
})
export class GenerateComponent implements OnInit {
  spos: SpoDTOFlat[] = [];
  semesters: SemesterDTO[] = [];
  documentTypes: string[] = ['MODULE_MANUAL', 'STUDY_GUIDE', 'SPO'];

  selectedSpoId: number | null = null;
  selectedSemesterId: number | null = null;
  selectedDocumentType: string = '';

  constructor(
    private spoService: SpoService,
    private semesterService: SemesterService,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.loadSpos();
    this.loadSemesters();
  }

  loadSpos(): void {
    this.spoService.getAll().subscribe(
      (spos) => this.spos = spos,
      (error) => console.error('Error loading SPOs', error)
    );
  }

  loadSemesters(): void {
    this.semesterService.getAllSemesters().subscribe(
      (semesters) => this.semesters = semesters,
      (error) => console.error('Error loading semesters', error)
    );
  }

  generateDocument(): void {
    if (this.selectedSpoId && this.selectedSemesterId && this.selectedDocumentType) {
      this.documentService.generateDocument(this.selectedSpoId, this.selectedSemesterId, this.selectedDocumentType)
        .subscribe(
          () => console.log('Document generated successfully'),
          (error) => console.error('Error generating document', error)
        );
    } else {
      console.warn('All fields need to be selected to generate the document.');
    }
  }
}
