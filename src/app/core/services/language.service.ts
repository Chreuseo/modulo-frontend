import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {LanguageDTO} from "../models/language-dto.model";

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends BaseService {

  private readonly endpoint = 'language'; // Base endpoint

  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Get all language
  getAllLanguages(): Observable<LanguageDTO[]> {
    return this.get<LanguageDTO[]>(`${this.endpoint}/all`);
  }

  // Add a new language
  addLanguage(language: LanguageDTO): Observable<LanguageDTO> {
    return this.post<LanguageDTO>(`${this.endpoint}/new`, language);
  }

  // Delete a language by ID
  deleteLanguage(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/remove/${id}`);
  }
}
