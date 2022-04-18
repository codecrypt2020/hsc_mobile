import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomModelPageRoutingModule } from './custom-model-routing.module';

import { CustomModelPage } from './custom-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomModelPageRoutingModule
  ],
  declarations: [CustomModelPage]
})
export class CustomModelPageModule {}
