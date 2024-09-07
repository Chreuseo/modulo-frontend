import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/base/app.component';
import { SpoListComponent } from './features/spo/spo-list/spo-list.component';
import { GeneralComponent } from './features/configuration/pages/general/general.component';
import { ModuleListComponent } from './features/module/module-list/module-list.component';
import {MyComponent} from "./features/my/my.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { UserListComponent } from './features/user/user-list/user-list.component';
import {NewSpoComponent} from "./features/spo/new-spo/new-spo.component";
import { SpoDetailOverviewComponent } from './features/spo/spo-detail-overview/spo-detail-overview.component';
import { SpoDetailModuleFramesComponent } from './features/spo/spo-detail-module-frames/spo-detail-module-frames.component';
import { SpoDetailTextComponent } from './features/spo/spo-detail-text/spo-detail-text.component';
import { NewModuleFrameComponent } from './features/spo/new-module-frame/new-module-frame.component';
import { ModuleFrameDetailComponent } from './features/spo/module-frame-detail/module-frame-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    SpoListComponent,
    NewSpoComponent,
    GeneralComponent,
    ModuleListComponent,
    MyComponent,
    UserListComponent,
    SpoDetailOverviewComponent,
    SpoDetailModuleFramesComponent,
    SpoDetailTextComponent,
    NewModuleFrameComponent,
    ModuleFrameDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
