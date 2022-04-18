import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfDReportsPageRoutingModule } from './self-dreports-routing.module';

import { SelfDReportsPage } from './self-dreports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfDReportsPageRoutingModule
  ],
  declarations: [SelfDReportsPage]
})
export class SelfDReportsPageModule {}
