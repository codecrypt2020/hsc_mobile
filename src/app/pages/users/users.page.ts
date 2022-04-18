import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, IonTabs, Platform } from '@ionic/angular';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: 'users.page.html',
  styleUrls: ['users.page.scss']
})
export class UsersPage {

  @ViewChild('myTabs') tabRef: IonTabs;
  
  constructor(private platform:Platform,private routerOutlet: IonRouterOutlet,private router:Router,
    private appConstant:AppConstantService,private restApi:RestApiService) { 
    this.loadUserAccessDefault();  
    interval(10000).subscribe(() => {
      this.loadUserAccess();
      //this.getNotiCount();
    });
}

ionViewDidEnter(){
  this.platform.backButton.subscribeWithPriority(-1, () => {
    if (!this.routerOutlet.canGoBack()) {
      navigator['app'].exitApp();
    }
  }); 
 
}
isChecklist = false;
isUAUC = false;
isSD = false;
loadUserAccessDefault(){
  if(!this.appConstant.isInternet){
      return null;
  }else{
    let data = {};
    this.restApi.getNodeUserAccess(data).then((success) => {
      this.isChecklist = success['data'][0]['checklist_selected']==1?true:false;
      this.isUAUC = success['data'][0]['issue_selected']==1?true:false;
      this.isSD = success['data'][0]['sd_selected']==1?true:false;
      if( localStorage.getItem('is_noti_r')=='0'){
      if(this.isUAUC){
        this.router.navigateByUrl('/users/tabs/home');
      }else if(this.isSD){
        this.router.navigateByUrl('/users/tabs/self-d-home');
      }else if(this.isChecklist){
        this.router.navigateByUrl('/users/tabs/inspections');
      }else{
        this.router.navigateByUrl('/users/tabs/profile');
      }
    }
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
  }
}

loadUserAccess(){
  if(!this.appConstant.isInternet){
      return null;
  }else{
    let data = {};
    this.restApi.getNodeUserAccess(data).then((success) => {
      this.isChecklist = success['data'][0]['checklist_selected']==1?true:false;
      this.isUAUC = success['data'][0]['issue_selected']==1?true:false;
      this.isSD = success['data'][0]['sd_selected']==1?true:false;
      localStorage.setItem('org_name', success['data'][0]['org_name'])
      if(this.isUAUC || this.isSD || this.isChecklist){
      //   this.router.navigateByUrl('/users/tabs/home');
      // }else if(this.isSD){
      //   this.router.navigateByUrl('/users/tabs/self-d-home');
      }else{
        this.router.navigateByUrl('/users/tabs/profile');
      }
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
  }
}

}
