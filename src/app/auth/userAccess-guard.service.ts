import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot,
} from '@angular/router';
import {UserAuthService} from "../services/auth.service";

@Injectable()
export class UserAccessGuardService implements CanActivate {
  constructor(private userAuthService: UserAuthService, private router: Router) {}

  // Information about the route and state of the router
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(!this.userAuthService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/forbidden']);
    return false;
  }

}
