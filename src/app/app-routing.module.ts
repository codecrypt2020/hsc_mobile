import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'incident-details',
    loadChildren: () => import('./pages/incident-details/incident-details.module').then( m => m.IncidentDetailsPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./pages/update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },
  {
    path: 'inc-response',
    loadChildren: () => import('./pages/inc-response/inc-response.module').then( m => m.IncResponsePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'get-started',
    loadChildren: () => import('./pages/get-started/get-started.module').then( m => m.GetStartedPageModule)
  },
  {
    path: 'checklist',
    loadChildren: () => import('./pages/checklist/checklist.module').then( m => m.ChecklistPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'checklist-action',
    loadChildren: () => import('./pages/checklist-action/checklist-action.module').then( m => m.ChecklistActionPageModule)
  },
  {
    path: 'custom-model',
    loadChildren: () => import('./pages/custom-model/custom-model.module').then( m => m.CustomModelPageModule)
  },
  {
    path: 'checklist-by-submitted',
    loadChildren: () => import('./pages/checklist-by-submitted/checklist-by-submitted.module').then( m => m.ChecklistBySubmittedPageModule)
  },
  {
    path: 'checklist-view',
    loadChildren: () => import('./pages/checklist-view/checklist-view.module').then( m => m.ChecklistViewPageModule)
  },
  {
    path: 'self-d',
    loadChildren: () => import('./pages/self-d/self-d.module').then( m => m.SelfDPageModule)
  },
  {
    path: 'self-ddetails',
    loadChildren: () => import('./pages/self-ddetails/self-ddetails.module').then( m => m.SelfDDetailsPageModule)
  },
  {
    path: 'save-issue-response',
    loadChildren: () => import('./save-issue-response/save-issue-response.module').then( m => m.SaveIssueResponsePageModule)
  },
  {
    path: 'emplist',
    loadChildren: () => import('./pages/emplist/emplist.module').then( m => m.EmplistPageModule)
  },
  {
    path: 'issue-list-by-filter',
    loadChildren: () => import('./pages/issue-list-by-filter/issue-list-by-filter.module').then( m => m.IssueListByFilterPageModule)
  },
  {
    path: 'pdfview',
    loadChildren: () => import('./pages/pdfview/pdfview.module').then( m => m.PDFViewPageModule)
  },
  {
    path: 'ptw-list',
    loadChildren: () => import('./pages/ptw-list/ptw-list.module').then( m => m.PtwListPageModule)
  },
  {
    path: 'ptw-details',
    loadChildren: () => import('./pages/ptw-details/ptw-details.module').then( m => m.PtwDetailsPageModule)
  },
  {
    path: 'add-ptw',
    loadChildren: () => import('./pages/add-ptw/add-ptw.module').then( m => m.AddPTWPageModule)
  },
  {
    path: 'shift-lists',
    loadChildren: () => import('./pages/shift-lists/shift-lists.module').then( m => m.ShiftListsPageModule)
  },
  {
    path: 'update-status-ptw',
    loadChildren: () => import('./pages/update-status-ptw/update-status-ptw.module').then( m => m.UpdateStatusPTWPageModule)
  },
  {
    path: 'extend-ptw',
    loadChildren: () => import('./pages/extend-ptw/extend-ptw.module').then( m => m.ExtendPTWPageModule)
  },
  {
    path: 'upload-doc',
    loadChildren: () => import('./pages/upload-doc/upload-doc.module').then( m => m.UploadDocPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
