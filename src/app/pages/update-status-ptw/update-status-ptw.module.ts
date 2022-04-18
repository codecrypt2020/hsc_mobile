import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateStatusPTWPageRoutingModule } from './update-status-ptw-routing.module';

import { UpdateStatusPTWPage } from './update-status-ptw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateStatusPTWPageRoutingModule
  ],
  declarations: [UpdateStatusPTWPage]
})
export class UpdateStatusPTWPageModule {}
