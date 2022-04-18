import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PtwListPage } from './ptw-list.page';

const routes: Routes = [
  {
    path: '',
    component: PtwListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PtwListPageRoutingModule {}
