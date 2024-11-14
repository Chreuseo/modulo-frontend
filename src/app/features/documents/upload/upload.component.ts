import {Component, OnInit} from '@angular/core';
import {SpoDTOFlat} from "../../../core/models/spo-dto-flat.model";
import {SemesterDTO} from "../../../core/models/semester-dto.model";
import {SpoService} from "../../../core/services/spo.service";
import {SemesterService} from "../../../core/services/semester.service";
import {DocumentService} from "../../../core/services/document.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['../../../core/stylesheets/details.css',
    '../../../core/stylesheets/sub-nav.css']
})
export class UploadComponent implements OnInit{
  spos: SpoDTOFlat[] = [];
  semesters: SemesterDTO[] = [];
  documentTypes: string[] = ['MODULE_MANUAL', 'STUDY_GUIDE', 'SPO'];

  selectedSpoId: number | null = null;
  selectedSemesterId: number | null = null;
  selectedDocumentType: string = '';
  selectedFile: File | null = null;

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
      (semesters) => {
        // Create an empty semester entry
        const emptySemester: SemesterDTO = {
          id: null,
          name: '',
          abbreviation: '',
          year: '',
        };

        // Prepend the empty entry to the list of semesters
        this.semesters = [emptySemester, ...semesters];
      },
      (error) => console.error('Error loading semesters', error)
    );
  }

  uploadDocument() {
    if (!this.selectedFile || this.selectedSpoId === null || this.selectedDocumentType === '') {
      console.error('No file selected or missing selections');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('spoId', this.selectedSpoId.toString());
    formData.append('documentType', this.selectedDocumentType);

    if (this.selectedSemesterId !== null) {
      formData.append('semesterId', this.selectedSemesterId.toString());
    }

    this.documentService.uploadDocument(formData).subscribe({
      next: () => console.log('Document uploaded successfully'),
      error: error => console.error('Error uploading document', error)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

}
