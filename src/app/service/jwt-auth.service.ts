import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { API_URL } from '../app.constants';

export const AUTHTOKEN = 'authToken'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})
export class JWTAuthService implements CanActivate {

  constructor(private router: Router,
    private httpService: HttpClient){}

  executeJWTAuthService(username: string, password: string) {
    // console.log("Hello World Bean Called")

    return this.httpService.post<any>(
      `${API_URL}/authenticate`,
      {username, password}).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(AUTHTOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      );
  }

  getLoggedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthToken(){
    if(this.getLoggedUser())
      return sessionStorage.getItem(AUTHTOKEN);

      return "";
  }

  isUserAuthenticated (){
    if(sessionStorage.getItem(AUTHENTICATED_USER) !== null){
      return true;
    }
    return false;
  }

  logout(){
    if(sessionStorage.getItem(AUTHENTICATED_USER) !== null){
      sessionStorage.removeItem(AUTHENTICATED_USER);
      sessionStorage.removeItem(AUTHTOKEN);
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(sessionStorage.getItem(AUTHENTICATED_USER) !== null)
      return true;
    
    this.router.navigate(['login']);
    return false;
  }
}

export class JWTAuthBean {

  constructor (private token: String){}

  getToken(){
    return this.token;
  }

}
