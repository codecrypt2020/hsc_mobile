import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecklistActionPageRoutingModule } from './checklist-action-routing.module';

import { ChecklistActionPage } from './checklist-action.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChecklistActionPageRoutingModule
  ],
  declarations: [ChecklistActionPage]
})
export class ChecklistActionPageModule {}
