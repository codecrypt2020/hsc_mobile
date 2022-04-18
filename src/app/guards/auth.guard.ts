import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthStatusService } from '../auth/auth-status.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthStatusService) { }

  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }
}