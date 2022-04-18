import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatusService } from 'src/app/auth/auth-status.service';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.page.html',
  styleUrls: ['./get-started.page.scss'],
})
export class GetStartedPage implements OnInit {

  constructor(private router:Router, private appConstant:AppConstantService, private authService:AuthStatusService,private restApi:RestApiService) { 
    this.loadUserAccessDefault()
  }

  ngOnInit() {
  }

  loadHomePage(){
    this.authService.authenticationState.next(true);
    let user_role = this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE));
    if(user_role=='user'){
      if(this.showDetails['issue_selected']==1){
        this.router.navigateByUrl('/users/tabs/home');
      }else if(this.showDetails['checklist_selected']==1){
        this.router.navigateByUrl('/users/tabs/inspections');
      }else if( this.showDetails['sd_selected']==1){
        this.router.navigateByUrl('/users/tabs/self-d-home');
      }else{
        this.router.navigateByUrl('/users/tabs/profile');
      }
    }else{
      this.router.navigateByUrl(this.finalURL);
    }
  }
  showDetails = []
  finalURL = '/admin/tabs/profile'
  loadUserAccessDefault(){
    if(!this.appConstant.isInternet){
        return null;
    }else{
      let data = {};
      this.restApi.getNodeUserAccess(data).then((success) => {

        this.showDetails =  success['data'][0];
        if(this.showDetails['issue_selected']==1 || this.showDetails['sd_selected']==1 || this.showDetails['checklist_selected']==1 || this.showDetails['work_permit_selected']==1){
          this.finalURL = '/admin/tabs/action'
        }else{
          this.finalURL = '/admin/tabs/profile'
        }
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
    }
  }  
}
