import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShiftListsPageRoutingModule } from './shift-lists-routing.module';

import { ShiftListsPage } from './shift-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShiftListsPageRoutingModule
  ],
  declarations: [ShiftListsPage]
})
export class ShiftListsPageModule {}
