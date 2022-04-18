import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { inspectionsPage } from './inspections.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { inspectionsPageRoutingModule } from './inspections-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    inspectionsPageRoutingModule
  ],
  declarations: [inspectionsPage]
})
export class inspectionsPageModule {}
