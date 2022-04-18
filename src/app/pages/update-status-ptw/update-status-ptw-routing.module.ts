import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateStatusPTWPage } from './update-status-ptw.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateStatusPTWPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateStatusPTWPageRoutingModule {}
