import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmplistPageRoutingModule } from './emplist-routing.module';

import { EmplistPage } from './emplist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmplistPageRoutingModule
  ],
  declarations: [EmplistPage]
})
export class EmplistPageModule {}
