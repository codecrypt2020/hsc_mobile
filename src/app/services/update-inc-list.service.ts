import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AppConstantService } from './app-constant.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateIncListService {

  updateListState = new BehaviorSubject(false);

  constructor(private plt: Platform, private appConstant: AppConstantService) {
    this.plt.ready().then(() => {
      this.checkListUpdate();
    });
  }

  checkListUpdate() {
    if (localStorage.getItem("dataUpdateAdminInc") == '1') {
      this.updateListState.next(true);
    } else {
      this.updateListState.next(false);
    }
  }

  isUpdateList() {
    return this.updateListState.value;
  }
}