import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmplistPage } from './emplist.page';

const routes: Routes = [
  {
    path: '',
    component: EmplistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmplistPageRoutingModule {}
