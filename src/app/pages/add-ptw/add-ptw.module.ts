import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPTWPageRoutingModule } from './add-ptw-routing.module';

import { AddPTWPage } from './add-ptw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPTWPageRoutingModule
  ],
  declarations: [AddPTWPage]
})
export class AddPTWPageModule {}
