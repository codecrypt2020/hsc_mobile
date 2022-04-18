import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { inspectionsPage } from './inspections.page';

const routes: Routes = [
  {
    path: '',
    component: inspectionsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class inspectionsPageRoutingModule {}
