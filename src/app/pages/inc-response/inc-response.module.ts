import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncResponsePageRoutingModule } from './inc-response-routing.module';

import { IncResponsePage } from './inc-response.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncResponsePageRoutingModule
  ],
  declarations: [IncResponsePage]
})
export class IncResponsePageModule {}
