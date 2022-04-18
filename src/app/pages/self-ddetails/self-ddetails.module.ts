import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfDDetailsPageRoutingModule } from './self-ddetails-routing.module';

import { SelfDDetailsPage } from './self-ddetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfDDetailsPageRoutingModule
  ],
  declarations: [SelfDDetailsPage]
})
export class SelfDDetailsPageModule {}
