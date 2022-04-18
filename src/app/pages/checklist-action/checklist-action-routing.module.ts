import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChecklistActionPage } from './checklist-action.page';

const routes: Routes = [
  {
    path: '',
    component: ChecklistActionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChecklistActionPageRoutingModule {}
