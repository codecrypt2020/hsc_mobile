import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthStatusService } from '../auth/auth-status.service';
import { UpdateDataStatusService } from './update-data-status.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService implements CanActivate {

  constructor(public auth: UpdateDataStatusService) { }

  canActivate(): boolean {
    return this.auth.isUpdateData();
  }
}