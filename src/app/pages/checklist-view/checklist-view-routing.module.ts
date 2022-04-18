import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChecklistViewPage } from './checklist-view.page';

const routes: Routes = [
  {
    path: '',
    component: ChecklistViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChecklistViewPageRoutingModule {}
