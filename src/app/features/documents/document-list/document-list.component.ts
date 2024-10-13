import { Component, OnInit } from '@angular/core';
import {SpoDocumentsDTO} from "../../../core/models/spo-documents-dto.model";
import {DocumentService} from "../../../core/services/document.service";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['../../../core/stylesheets/list-view.css',
    '../../../core/stylesheets/sub-nav.css']
})
export class DocumentListComponent implements OnInit {
  spoDocuments: SpoDocumentsDTO[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadSpos();
  }

  loadSpos(): void {
    this.documentService.getSPOs().subscribe({
      next: (data: SpoDocumentsDTO[]) => {
        this.spoDocuments = data;
      },
      error: (err) => {
        console.error('Error fetching SPOs:', err);
      }
    });
  }

  getDocument(spoId: number, semesterId: number , documentType: string): void {
    this.documentService.getDocument(spoId, semesterId, documentType).subscribe(blob => {
      // Create a link element to download the blob
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = documentType; // or you can set it to a predefined name
      link.click();
    }, err => {
      console.error('Error downloading document:', err);
    });
  }
}
