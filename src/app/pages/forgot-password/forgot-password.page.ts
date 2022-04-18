import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStatusService } from 'src/app/auth/auth-status.service';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  login = {
    email:'',
  };

  validatePassword = {
    otp:'',
    password:'',
    c_password:''
  };

  isSendOTP = true;
  serverOTP = '';

 constructor( private restApi: RestApiService, private router: Router, private authService: AuthStatusService, private appConstant: AppConstantService) { }

  sendOTPOnMail(form: NgForm) { 
    if (!form.invalid) {
      // this.appConstant.showLoading("sending OTP on email. Please wait...");
      // this.restApi.sendOTPApi(this.login).then((success) => {
      //   this.appConstant.dismissLoading();
      //   this.isSendOTP = false;
      //   //console.log(success)
      //   let responseData = success['data'][0];
      // }, (error) => {
      //   this.appConstant.dismissLoading();
      //   this.appConstant.handleApiError(error)
      // });
    } else {
      form.formDirective['submitted'] = true;
    }
  }

  upadtePassword(form: NgForm) { 
    if (!form.invalid) {
      // this.appConstant.showLoading("Updateing password. Please wait...");
      // this.restApi.userLoginApi(this.login).then((success) => {
      //   this.appConstant.dismissLoading();
      //   let responseData = success['data'][0];
      // }, (error) => {
      //   this.appConstant.dismissLoading();
      //   this.appConstant.handleApiError(error)
      // });

    } else {
      form.formDirective['submitted'] = true;
    }
  }


  ngOnInit() {
  }

  goBack(){

  }

}
