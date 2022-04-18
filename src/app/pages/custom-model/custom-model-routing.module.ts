import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomModelPage } from './custom-model.page';

const routes: Routes = [
  {
    path: '',
    component: CustomModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomModelPageRoutingModule {}
