import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { overviewPage } from './overview.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { overviewPageRoutingModule } from './overview-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ExploreContainerComponentModule,
    overviewPageRoutingModule
  ],
  declarations: [overviewPage]
})
export class overviewPageModule {}
