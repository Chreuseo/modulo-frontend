// app/core/services/paragraph.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {ParagraphDTO} from "../models/paragraph-dto.model";


@Injectable({
  providedIn: 'root'
})
export class ParagraphService extends BaseService {
  private endpoint: string = 'paragraphs';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  addParagraph(paragraphDTO: ParagraphDTO): Observable<ParagraphDTO> {
    return this.post<ParagraphDTO>(this.endpoint, paragraphDTO);
  }

  updateParagraph(paragraphDTO: ParagraphDTO): Observable<ParagraphDTO> {
    return this.put<ParagraphDTO>(`${this.endpoint}/update/${paragraphDTO.id}`, paragraphDTO);
  }

  deleteParagraph(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/delete/${id}`);
  }

  getParagraphsBySpo(spoId: number): Observable<ParagraphDTO[]> {
    return this.get<ParagraphDTO[]>(`${this.endpoint}/spo/${spoId}`);
  }
}
