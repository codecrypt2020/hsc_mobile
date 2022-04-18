import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfDReportsPage } from './self-dreports.page';

const routes: Routes = [
  {
    path: '',
    component: SelfDReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfDReportsPageRoutingModule {}
