import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfDPageRoutingModule } from './self-d-routing.module';

import { SelfDPage } from './self-d.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfDPageRoutingModule
  ],
  declarations: [SelfDPage]
})
export class SelfDPageModule {}
