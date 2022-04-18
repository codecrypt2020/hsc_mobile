import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChecklistBySubmittedPage } from './checklist-by-submitted.page';

const routes: Routes = [
  {
    path: '',
    component: ChecklistBySubmittedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChecklistBySubmittedPageRoutingModule {}
