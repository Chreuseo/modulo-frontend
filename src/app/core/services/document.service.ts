import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {Router} from "@angular/router";
import {SpoDocumentsDTO} from "../models/spo-documents-dto.model";

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
    let params = new HttpParams()
      .set('spoId', spoId.toString())
      .set('semesterId', semesterId.toString())
      .set('documentType', documentType);

    return this.getBlob(`${this.endpoint}/get`, { params });
  }

  /**
   * Generate a document with the provided identifiers and document type.
   * @param spoId - The ID of the SPO.
   * @param semesterId - The ID of the semester.
   * @param documentType - The type of document to generate.
   * @returns An Observable of void (no content).
   */
  generateDocument(spoId: number, semesterId: number, documentType: string): Observable<void> {
    return this.post<void>(`${this.endpoint}/generate/${spoId}/${semesterId}/${documentType}`, null);
  }

  getSPOs(): Observable<SpoDocumentsDTO[]> {
    return this.get<any>(`${this.endpoint}/spos`);
  }
}
