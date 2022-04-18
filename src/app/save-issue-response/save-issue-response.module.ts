import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaveIssueResponsePageRoutingModule } from './save-issue-response-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { SaveIssueResponsePage } from './save-issue-response.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    SaveIssueResponsePageRoutingModule
  ],
  declarations: [SaveIssueResponsePage]
})
export class SaveIssueResponsePageModule {}
