// src/app/features/module/module-list/module-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ModuleImplementationService } from '../../../core/services/module-implementation.service';
import { ModuleImplementationDTOFlat } from '../../../core/models/module-implementation-dto-flat.model';
import {Router} from "@angular/router"; // Adjust import path as necessary

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['../../../core/stylesheets/list-view.css']
})
export class ModuleListComponent implements OnInit {
  public modules: ModuleImplementationDTOFlat[] = [];

  constructor(private moduleService: ModuleImplementationService,
              private router: Router) {}

  ngOnInit(): void {
    this.loadModules();
  }

  loadModules(): void {
    this.moduleService.getAll().subscribe(
      (data: ModuleImplementationDTOFlat[]) => {
        this.modules = data;
      },
      (error) => {
        console.error('Error fetching module implementations:', error);
      }
    );
  }

  navigateToNewModule() {
    this.router.navigate(['/module/new']);
  }

  navigateToModuleDetail(id: number): void {
    this.router.navigate(['/module', id]);
  }
}
