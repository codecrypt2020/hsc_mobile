import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PDFViewPageRoutingModule } from './pdfview-routing.module';

import { PDFViewPage } from './pdfview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PDFViewPageRoutingModule
  ],
  declarations: [PDFViewPage]
})
export class PDFViewPageModule {}
