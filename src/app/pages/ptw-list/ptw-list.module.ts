import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PtwListPageRoutingModule } from './ptw-list-routing.module';

import { PtwListPage } from './ptw-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PtwListPageRoutingModule
  ],
  declarations: [PtwListPage]
})
export class PtwListPageModule {}
