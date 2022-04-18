import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { actionPage } from './action.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { actionPageRoutingModule } from './action-routing.module';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Ionic4DatepickerModule,
    IonicSelectableModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: actionPage }]),
    actionPageRoutingModule,
  ],
  declarations: [actionPage]
})
export class actionPageModule {}
