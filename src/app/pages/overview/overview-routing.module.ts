import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { overviewPage } from './overview.page';

const routes: Routes = [
  {
    path: '',
    component: overviewPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class overviewPageRoutingModule {}
