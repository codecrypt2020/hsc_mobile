import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { issuePage } from './issue.page';

const routes: Routes = [
  {
    path: '',
    component: issuePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class issuePageRoutingModule {}
