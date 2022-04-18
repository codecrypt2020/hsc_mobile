import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PDFViewPage } from './pdfview.page';

const routes: Routes = [
  {
    path: '',
    component: PDFViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PDFViewPageRoutingModule {}
