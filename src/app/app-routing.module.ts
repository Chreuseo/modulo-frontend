import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SpoListComponent} from "./features/spo/spo-list/spo-list.component";
import {ModuleListComponent} from "./features/module/module-list/module-list.component";
import {GeneralComponent} from "./features/configuration/pages/general/general.component";
import {MyComponent} from "./features/my/my.component";
import {UserListComponent} from "./features/user/user-list/user-list.component";
import {NewSpoComponent} from "./features/spo/new-spo/new-spo.component";
import {SpoDetailOverviewComponent} from "./features/spo/spo-detail-overview/spo-detail-overview.component";
import {
  SpoDetailModuleFramesComponent
} from "./features/spo/spo-detail-module-frames/spo-detail-module-frames.component";
import {SpoDetailTextComponent} from "./features/spo/spo-detail-text/spo-detail-text.component";
import {NewModuleFrameComponent} from "./features/spo/new-module-frame/new-module-frame.component";

const routes: Routes = [
  { path: 'spo', component: SpoListComponent },
  { path: 'new-spo', component: NewSpoComponent },
  { path: 'spo/:id/overview', component: SpoDetailOverviewComponent },  // Route for Spo detail view
  { path: 'spo/:id/module-frames', component: SpoDetailModuleFramesComponent },  // Route for Spo detail view
  { path: 'spo/:id/text', component: SpoDetailTextComponent},
  { path: 'module-frame/new/:spoId', component: NewModuleFrameComponent },
  { path: 'module', component: ModuleListComponent },
  { path: 'user', component: UserListComponent},
  { path: 'configuration', component: GeneralComponent },
  { path: 'my', component: MyComponent},
  { path: '', redirectTo: '/spo', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
