import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStatusService } from 'src/app/auth/auth-status.service';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment as ENV } from '../../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login = {
    username:'',
    password:''
  };
  constructor( private restApi: RestApiService, private router: Router, private authService: AuthStatusService, private appConstant: AppConstantService) { }

  ngOnInit() {
  }

  userLogin(form: NgForm) { 
    if (!form.invalid) {
      this.appConstant.showLoading("Logging in. Please wait...");
      this.restApi.nodeUserLogin(this.login).then((success) => {
        if(success['success']==true){
          this.appConstant.dismissLoading();
            localStorage.setItem(this.appConstant.TAG_API_ACCESS_TOKEN, success['data']['token']);
            localStorage.setItem(this.appConstant.TAG_IS_USER_ROLE, success['data']['type']);
            this.loadUserProfile();
        }else{
          this.appConstant.toastMsg(success['message']);
        }
   
      }, (error) => {
        this.appConstant.dismissLoading();
        if(error['error']['message']=="Invalid Credentials"){
          this.appConstant.toastMsg('Sorry! Invalid Password');
        }
        if(error['error']['message']=="Oops! This user is not available"){
          this.appConstant.toastMsg('Sorry! This email does not exists');
        }
       
        //this.appConstant.handleApiError(error)
      });

    } else {
      form.formDirective['submitted'] = true;
    }
  }

  loadUserAccess(){
      let data = {};
      this.restApi.getNodeUserAccess(data).then((success) => {
        let showDetails =  success['data'][0];
        localStorage.setItem('org_name',showDetails['org_name'])
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
  }

  loadUserProfile(){
    let data= {
     }
    this.restApi.loadUserDetails(data).then((success) => {
      this.loadUserAccess();
      localStorage.setItem(this.appConstant.TAG_IS_USER_LOGIN, '1');
      localStorage.setItem(this.appConstant.TAG_USER_DETAILS, JSON.stringify(success['data'][0]));
      localStorage.setItem(this.appConstant.TAG_IS_USER_ID, success['data'][0]['id']);
      localStorage.setItem(this.appConstant.TAG_IS_USER_ROLE, success['data'][0]['emp_type_ref_id']);
      localStorage.setItem("oldCount","0")
      this.saveOneSignalID();
      this.router.navigateByUrl('/get-started'); 
    }, (error) => {
    });
  }

  saveOneSignalID(){
    let dataObject = {
      user_id: localStorage.getItem(this.appConstant.TAG_IS_USER_ID),
      player_id: localStorage.getItem('player_id')
    };
    this.restApi.nodeStorePlayerID(dataObject).then((success) => {
    }, (error) => {
    });
  }
}
