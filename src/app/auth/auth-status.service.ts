import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { AppConstantService } from '../services/app-constant.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStatusService {

  authenticationState = new BehaviorSubject(false);

  constructor(private plt: Platform, private appConstant: AppConstantService) {
    this.plt.ready().then(() => {
      this.checkUserLogin();
    });
  }

  checkUserLogin() {
    if (localStorage.getItem(this.appConstant.TAG_IS_USER_LOGIN) == '1') {
      this.authenticationState.next(true);
    } else {
      this.authenticationState.next(false);
    }
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}