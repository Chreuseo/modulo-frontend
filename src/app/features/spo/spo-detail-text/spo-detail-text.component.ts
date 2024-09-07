import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {SpoDTO} from "../../../core/models/spo-dto.model";
import {ParagraphDTO} from "../../../core/models/paragraph-dto.model";
import {SpoService} from "../../../core/services/spo.service";
import {ParagraphService} from "../../../core/services/paragraph.service";

@Component({
  selector: 'app-spo-detail-text',
  templateUrl: './spo-detail-text.component.html',
  styleUrls: ['../../../core/stylesheets/spo-paragraphs.css',
  '../../../core/stylesheets/sub-nav.css']
})
export class SpoDetailTextComponent implements OnInit {
  spoId!: number;
  spo!: SpoDTO;
  paragraphs: ParagraphDTO[] = [];
  editableParagraph: ParagraphDTO = { id: 0, spoId: 0, title: '', text: '' };
  newParagraph: ParagraphDTO = { id: 0, spoId: 0, title: '', text: '' }; // Initialize new paragraph DTO
  spoForm: FormGroup;
  isDisabled: boolean = true; // Initial state is disabled

  constructor(
    private route: ActivatedRoute,
    private spoService: SpoService,
    private paragraphService: ParagraphService,
    private fb: FormBuilder
  ) {
    this.spoForm = this.fb.group({
      header: [{ value: '', disabled: this.isDisabled }], // Initialize with disabled
      footer: [{ value: '', disabled: this.isDisabled }]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.spoId = +idParam;
      this.loadSpo(); // Load SPO
    } else {
      console.error('SPO ID not found in route parameters');
    }
  }

  loadSpo(): void {
    this.spoService.getSpo(this.spoId).subscribe(
      spo => {
        this.spo = spo;
        this.spoForm.patchValue({
          header: spo.header,
          footer: spo.footer
        });
        this.loadParagraphs(); // Load paragraphs after SPO is fetched
      },
      error => {
        console.error('Error fetching SPO:', error);
      }
    );
  }

  loadParagraphs(): void {
    this.paragraphService.getParagraphsBySpo(this.spoId).subscribe(
      paragraphs => {
        this.paragraphs = paragraphs;
      },
      error => {
        console.error('Error fetching paragraphs:', error);
      }
    );
  }

  editParagraph(paragraph: ParagraphDTO): void {
    this.editableParagraph = { ...paragraph }; // Clone the paragraph for editing
  }

  saveParagraph(): void {
    if (this.editableParagraph) {
      this.paragraphService.updateParagraph(this.editableParagraph).subscribe(() => {
        this.loadParagraphs(); // Reload paragraphs to refresh the list
        this.editableParagraph = { id: 0, spoId: 0, title: '', text: '' }; // Clear editable state
      });
    }
  }

  deleteParagraph(id: number): void {
    this.paragraphService.deleteParagraph(id).subscribe(() => {
      this.loadParagraphs(); // Reload paragraphs after deletion
    });
  }

  addParagraph(): void {
    const newParagraph: ParagraphDTO = {
      id: 0,
      spoId: this.spoId, // Use the current SPO ID
      title: this.newParagraph.title,
      text: this.newParagraph.text
    };

    this.paragraphService.addParagraph(newParagraph).subscribe(() => {
      this.loadParagraphs(); // Reload paragraphs after adding new one
      this.newParagraph = { id: 0, spoId: this.spoId, title: '', text: '' }; // Reset new paragraph form
    });
  }

  onEdit() {
    this.isDisabled = false;  // Enable fields
    this.spoForm.enable(); // Unlock the form fields for editing
  }

  onSave() {
    if (this.spoForm.valid) {
      // Create a new SpoDto object to send to the service
      const updatedSpo: SpoDTO = {
        ...this.spo, // Spread existing Spo data
        header: this.spoForm.value.header, // Get the updated header from form
        footer: this.spoForm.value.footer  // Get the updated footer from form
      };

      this.spoService.updateSpo(updatedSpo).subscribe(
        response => {
          console.log('Update successful', response);
          this.isDisabled = true;  // Re-disable fields after saving
          this.spoForm.disable(); // Lock the form fields again
        },
        error => {
          console.error('Update failed', error);
          // Handle error as needed (e.g., show an error message)
        }
      );
    } else {
      console.error('Form is invalid');
      // Optionally inform the user that the form is invalid
    }
  }
}
