import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShiftListsPage } from './shift-lists.page';

const routes: Routes = [
  {
    path: '',
    component: ShiftListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftListsPageRoutingModule {}
