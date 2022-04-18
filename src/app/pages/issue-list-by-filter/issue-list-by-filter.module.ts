import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssueListByFilterPageRoutingModule } from './issue-list-by-filter-routing.module';

import { IssueListByFilterPage } from './issue-list-by-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueListByFilterPageRoutingModule
  ],
  declarations: [IssueListByFilterPage]
})
export class IssueListByFilterPageModule {}
