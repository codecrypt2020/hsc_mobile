import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthStatusService } from 'src/app/auth/auth-status.service';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { UpdateDataStatusService } from 'src/app/services/update-data-status.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  userDetails = {
    name:'',
    email:'',
    mobile:'',
    password:'',
    type :''
  };

  userPassword = {
    confirmNewPassword: "",
    email: "",
    newPassword: "",
    oldPassword: "",
  };
  constructor(private platform:Platform, private restApi: RestApiService, private router: Router, private authService: AuthStatusService, private appConstant: AppConstantService,
    private updateData:UpdateDataStatusService) { 
    let user_d = JSON.parse(localStorage.getItem(this.appConstant.TAG_USER_DETAILS));
    this.userDetails = {
      name:user_d['emp_name'],
      email:user_d['emp_email'],
      mobile:user_d['emp_mobile'],
      password:user_d['emp_id'],
      type : this.appConstant.getUserType()
    };
    this.userPassword = {
      confirmNewPassword: "",
      email: user_d['emp_email'],
      newPassword: "",
      oldPassword: "",
    };
    this.platform.backButton.subscribe(() => {
      localStorage.setItem("dataUpdateProfile","1");
      this.updateData.dataChangeState.next(true);
      if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
        this.router.navigateByUrl('/users/tabs/profile');
      }else{
        this.router.navigateByUrl('/admin/tabs/profile');
      }
    });
  }

  ngOnInit() {
  }

  goBack(){
    localStorage.setItem("dataUpdateProfile","1");
    this.updateData.dataChangeState.next(true);
    if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
      this.router.navigateByUrl('/users/tabs/profile');
    }else{
      this.router.navigateByUrl('/admin/tabs/profile');
    }
  }

  userLogin(form: NgForm) { 
    if (!form.invalid) {
      this.appConstant.showLoading("Updating profile. Please wait...");
      this.restApi.nodeUpdateEmpDetails(this.userDetails).then((success) => {
        this.appConstant.toastMsg('Profile updated successfully.');
        this.appConstant.dismissLoading();
      }, (error) => {
        this.appConstant.dismissLoading();
        this.appConstant.handleApiError(error)
      });

    } else {
      form.formDirective['submitted'] = true;
    }
  }

  updatePassword(form: NgForm) { 
    if (!form.invalid) {
      if(this.userPassword['newPassword']==this.userPassword['confirmNewPassword']){
        this.appConstant.showLoading("Updating Password. Please wait...");
        this.restApi.nodeUpdateEmpPWD(this.userPassword).then((success) => {
          this.appConstant.toastMsg(success['message']);
          this.appConstant.dismissLoading();
        }, (error) => {
          this.appConstant.dismissLoading();
          this.appConstant.handleApiError(error)
        });
      }else{
        this.appConstant.toastMsg('Password not matching.');
      }
    } else {
      form.formDirective['submitted'] = true;
    }
  }

}
