import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentDetailsPageRoutingModule } from './incident-details-routing.module';

import { IncidentDetailsPage } from './incident-details.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    IncidentDetailsPageRoutingModule
  ],
  declarations: [IncidentDetailsPage]
})
export class IncidentDetailsPageModule {}
