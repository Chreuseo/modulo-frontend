import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {Router} from "@angular/router";
import {SpoDocumentsDTO} from "../models/spo-documents-dto.model";
import {DocumentGenerationBulkDTO} from "../models/document-generation-bulk-dto.model";

@Injectable({
  providedIn: 'root',
})
export class DocumentService extends BaseService {

  constructor(protected override router: Router,
              protected override http: HttpClient) {
    super(router, http);
  }

  private readonly endpoint = 'document';


  /**
   * Fetch a document by its identifiers.
   * @param spoId - The ID of the SPO.
   * @param semesterId - The ID of the semester.
   * @param documentType - The type of document to fetch.
   * @returns An Observable of the document blob.
   */
  getDocument(spoId: number, semesterId: number, documentType: string): Observable<Blob> {

    return this.getBlob(`${this.endpoint}/get/${spoId}/${semesterId}/${documentType}`);
  }

  /**
   * Generate a document with the provided identifiers and document type.
   * @param spoId - The ID of the SPO.
   * @param semesterId - The ID of the semester.
   * @param documentType - The type of document to generate.
   * @returns An Observable of void (no content).
   */
  generateDocument(spoId: number, semesterId: number, documentType: string): Observable<void> {
    return this.post<void>(`${this.endpoint}/generate/${spoId}/${semesterId}/${documentType}`, {});
  }

  generateBulkDocument(documentGenerationBulkDTO: DocumentGenerationBulkDTO): Observable<void> {
    return this.post<void>(`${this.endpoint}/generate/bulk`, documentGenerationBulkDTO);
  }

  getSPOs(): Observable<SpoDocumentsDTO[]> {
    return this.get<any>(`${this.endpoint}/spos`);
  }

  uploadDocument(formData: FormData, spoId: number, semesterId: number | null, documentType: string): Observable<void> {
    let endpointUrl = `${this.endpoint}/upload/${spoId}/${documentType}`;
    if (semesterId !== null) {
      endpointUrl += `/${semesterId}`;
    }
    return this.post<void>(endpointUrl, formData);
  }

}
