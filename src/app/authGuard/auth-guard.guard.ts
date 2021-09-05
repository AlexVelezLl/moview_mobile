import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
  async canActivate() {
    if (await this.userService.getSessionToken()) {
      return true;
    }
    this.router.navigateByUrl('/login', { replaceUrl: true });
    return false;
  }
}
