import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncResponsePage } from './inc-response.page';

const routes: Routes = [
  {
    path: '',
    component: IncResponsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncResponsePageRoutingModule {}
