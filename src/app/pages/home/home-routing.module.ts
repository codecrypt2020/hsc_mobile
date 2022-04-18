import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { homePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: homePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,CommonModule],
})
export class homePageRoutingModule {}
