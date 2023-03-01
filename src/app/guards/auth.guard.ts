import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterApiServiceService } from '../services/register-api-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private APIservice: RegisterApiServiceService, private cookieService: CookieService, private router: Router) {
  } 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.APIservice.checkuserIsloggedin()) {
      this.router.navigate(['/signin']);
      return false;
    } else {
      // this.router.navigate(['/user']);
      return true;
    }
  }

}
