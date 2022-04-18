import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssueListByFilterPage } from './issue-list-by-filter.page';

const routes: Routes = [
  {
    path: '',
    component: IssueListByFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssueListByFilterPageRoutingModule {}
