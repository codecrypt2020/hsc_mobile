import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfDHomePageRoutingModule } from './self-dhome-routing.module';

import { SelfDHomePage } from './self-dhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfDHomePageRoutingModule
  ],
  declarations: [SelfDHomePage]
})
export class SelfDHomePageModule {}
