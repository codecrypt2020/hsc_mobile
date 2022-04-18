import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PTWPageRoutingModule } from './ptw-routing.module';

import { PTWPage } from './ptw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PTWPageRoutingModule
  ],
  declarations: [PTWPage]
})
export class PTWPageModule {}
