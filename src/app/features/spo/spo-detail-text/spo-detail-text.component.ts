import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SpoDTO} from "../../../core/models/spo-dto.model";
import {ParagraphDTO} from "../../../core/models/paragraph-dto.model";
import {SpoService} from "../../../core/services/spo.service";
import {ParagraphService} from "../../../core/services/paragraph.service";
import {quillModules} from "../../../shared/components/quill-config";

@Component({
  selector: 'app-spo-detail-text',
  templateUrl: './spo-detail-text.component.html',
  styleUrls: ['../../../core/stylesheets/spo-paragraphs.css',
  '../../../core/stylesheets/sub-nav.css',
  '../../../core/stylesheets/quill.css']
})
export class SpoDetailTextComponent implements OnInit {
  spoId!: number;
  spo!: SpoDTO;
  paragraphs: ParagraphDTO[] = [];
  editableParagraph: ParagraphDTO = { id: 0, spoId: 0, title: '', text: '' };
  newParagraph: ParagraphDTO = { id: 0, spoId: 0, title: '', text: '' }; // Initialize new paragraph DTO
  isDisabled: boolean = true; // Initial state is disabled
  quillModules = quillModules;

  constructor(
    private route: ActivatedRoute,
    private spoService: SpoService,
    private paragraphService: ParagraphService,
  ) { }

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
  }

  onSave() {
    this.spoService.updateSpo(this.spo).subscribe(
      response => {
        console.log('Update successful', response);
        this.isDisabled = true;  // Re-disable fields after saving
      },
      error => {
        console.error('Update failed', error);
        // Handle error as needed (e.g., show an error message)
      }
    );
  }
}
