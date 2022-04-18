import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { issuePage } from './issue.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { issuePageRoutingModule } from './issue-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: issuePage }]),
    issuePageRoutingModule,
  ],
  declarations: [issuePage]
})
export class issuePageModule {}
