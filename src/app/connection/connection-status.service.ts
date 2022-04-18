import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AppConstantService } from '../services/app-constant.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionStatusService {

  connectionState = new BehaviorSubject(false);
  constructor(private plt: Platform, private appConstant: AppConstantService) { 
    this.connectionState.next(window.navigator.onLine);
  }

  isConnectionAvailable() {
    return this.connectionState.value;
  }
  
}
