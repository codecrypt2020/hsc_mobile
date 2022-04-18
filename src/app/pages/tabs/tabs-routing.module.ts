import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'overview',
        loadChildren: () => import('../overview/overview.module').then(m => m.overviewPageModule)
      },
      {
        path: 'inspections',
        loadChildren: () => import('../inspections/inspections.module').then(m => m.inspectionsPageModule)
      },
      {
        path: 'issue',
        loadChildren: () => import('../issue/issue.module').then(m => m.issuePageModule)
      },{
        path: 'action',
        loadChildren: () => import('../action/action.module').then(m => m.actionPageModule)
      },{
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.profilePageModule)
      },
      {
        path: 'self-dreports',
        loadChildren: () => import('../self-dreports/self-dreports.module').then( m => m.SelfDReportsPageModule)
      },{
        path: 'ptw',
        loadChildren: () => import('../ptw/ptw.module').then( m => m.PTWPageModule)
      },
      {
        path: '',
        redirectTo: '/admin/tabs/action',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/admin/tabs/action',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
