import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationGuard implements CanActivate {
  constructor(private _router:Router){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const accessUserToken = localStorage.getItem('userToken');
      if(accessUserToken == null || accessUserToken == '' ){
        alert("Please Sign in or login to join")
        this._router.navigate(['/sign-in'])
        return false;
      }
      else
      {
        return true
      }

  }
  
}
