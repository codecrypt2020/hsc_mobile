import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PtwDetailsPageRoutingModule } from './ptw-details-routing.module';

import { PtwDetailsPage } from './ptw-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PtwDetailsPageRoutingModule
  ],
  declarations: [PtwDetailsPage]
})
export class PtwDetailsPageModule {}
