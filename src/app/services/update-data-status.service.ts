import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AppConstantService } from './app-constant.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataStatusService {

  
  dataChangeState = new BehaviorSubject(false);

  constructor(private plt: Platform, private appConstant: AppConstantService) {
    this.plt.ready().then(() => {
      this.checkDataUpdate();
    });
  }

  checkDataUpdate() {
    if (localStorage.getItem("dataUpdate") == '1') {
      this.dataChangeState.next(true);
    } else {
      this.dataChangeState.next(false);
    }
    
  }

  isUpdateData() {
    return this.dataChangeState.value;
  }
}
