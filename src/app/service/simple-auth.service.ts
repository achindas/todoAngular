import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpleAuthService implements CanActivate {

  constructor(private router: Router){}

  authenticate(username: string, password: string) {

    if (username === 'Achin' && password === 'dummy'){
      sessionStorage.setItem("authenticatedUser", username);
      return true;
   }
   return false;
  }

  isUserAuthenticated (){
    if(sessionStorage.getItem("authenticatedUser") !== null){
      return true;
    }
    return false;
  }

  logout(){
    if(sessionStorage.getItem("authenticatedUser") !== null){
      sessionStorage.removeItem("authenticatedUser");
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(sessionStorage.getItem("authenticatedUser") !== null)
      return true;
    
    this.router.navigate(['login']);
    return false;
  }
}
