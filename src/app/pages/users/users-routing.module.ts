import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPage } from './users.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: UsersPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.homePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.profilePageModule)
      },
      {
        path: 'inspections',
        loadChildren: () => import('../inspections/inspections.module').then(m => m.inspectionsPageModule)
      },
      {
        path: 'self-d-home',
        loadChildren: () => import('../self-dhome/self-dhome.module').then(m => m.SelfDHomePageModule)
      }
      ,
      {
        path: '',
        redirectTo: '/users/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/users/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
})
export class UsersPageRoutingModule {}
