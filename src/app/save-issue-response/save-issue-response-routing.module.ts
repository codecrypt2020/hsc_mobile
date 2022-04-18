import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveIssueResponsePage } from './save-issue-response.page';

const routes: Routes = [
  {
    path: '',
    component: SaveIssueResponsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveIssueResponsePageRoutingModule {}
