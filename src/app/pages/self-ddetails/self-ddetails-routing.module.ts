import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfDDetailsPage } from './self-ddetails.page';

const routes: Routes = [
  {
    path: '',
    component: SelfDDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfDDetailsPageRoutingModule {}
