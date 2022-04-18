import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PtwDetailsPage } from './ptw-details.page';

const routes: Routes = [
  {
    path: '',
    component: PtwDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PtwDetailsPageRoutingModule {}
