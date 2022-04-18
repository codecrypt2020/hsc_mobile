import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPTWPage } from './add-ptw.page';

const routes: Routes = [
  {
    path: '',
    component: AddPTWPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPTWPageRoutingModule {}
