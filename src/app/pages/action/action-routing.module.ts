import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { actionPage } from './action.page';

const routes: Routes = [
  {
    path: '',
    component: actionPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class actionPageRoutingModule {}
