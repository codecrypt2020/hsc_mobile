import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfDPage } from './self-d.page';

const routes: Routes = [
  {
    path: '',
    component: SelfDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfDPageRoutingModule {}
