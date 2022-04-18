import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtendPTWPageRoutingModule } from './extend-ptw-routing.module';

import { ExtendPTWPage } from './extend-ptw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtendPTWPageRoutingModule
  ],
  declarations: [ExtendPTWPage]
})
export class ExtendPTWPageModule {}
