import { Component, OnInit } from '@angular/core';
import {LanguageDTO} from "../../../../core/models/language-dto.model";
import {LanguageService} from "../../../../core/services/language.service";

@Component({
  selector: 'app-languages',
  templateUrl: './language.component.html',
})
export class LanguageComponent implements OnInit {
  languages: LanguageDTO[] = [];
  newLanguageName: string = '';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.loadLanguages();
  }

  loadLanguages(): void {
    this.languageService.getAllLanguages().subscribe(languages => {
      this.languages = languages;
    });
  }

  deleteLanguage(id: number): void {
    this.languageService.deleteLanguage(id).subscribe(() => {
      this.loadLanguages(); // Refresh the list after deletion
    });
  }

  addLanguage(): void {
    if (this.newLanguageName.trim()) {
      const newLanguage: LanguageDTO = { id: 0, name: this.newLanguageName.trim() };
      this.languageService.addLanguage(newLanguage).subscribe(() => {
        this.loadLanguages();
        this.newLanguageName = ''; // Clear the input field
      });
    }
  }
}
