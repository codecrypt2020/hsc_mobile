import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PTWPage } from './ptw.page';

const routes: Routes = [
  {
    path: '',
    component: PTWPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PTWPageRoutingModule {}
