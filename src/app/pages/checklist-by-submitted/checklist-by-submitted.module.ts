import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecklistBySubmittedPageRoutingModule } from './checklist-by-submitted-routing.module';

import { ChecklistBySubmittedPage } from './checklist-by-submitted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChecklistBySubmittedPageRoutingModule
  ],
  declarations: [ChecklistBySubmittedPage]
})
export class ChecklistBySubmittedPageModule {}
