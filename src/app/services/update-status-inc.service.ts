import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AppConstantService } from './app-constant.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateStatusIncService {

  updateStatusState = new BehaviorSubject(false);

  constructor(private plt: Platform, private appConstant: AppConstantService) {
    this.plt.ready().then(() => {
      this.checkStatusUpdate();
    });
  }

  checkStatusUpdate() {
    if (localStorage.getItem("dataUpdateStatus") == '1') {
      this.updateStatusState.next(true);
    } else {
      this.updateStatusState.next(false);
    }
  }

  isUpdateStatus() {
    return this.updateStatusState.value;
  }
}