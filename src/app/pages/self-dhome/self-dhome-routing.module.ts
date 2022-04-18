import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfDHomePage } from './self-dhome.page';

const routes: Routes = [
  {
    path: '',
    component: SelfDHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfDHomePageRoutingModule {}
