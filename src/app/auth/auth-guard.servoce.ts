import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot,
} from '@angular/router';
import {UserAuthService} from "../services/auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private userAuthService: UserAuthService, private router: Router) {}

  // Information about the route and state of the router
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.userAuthService.getToken();
    if (!token) {
      alert('Please login first!');
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
