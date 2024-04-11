import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
//import { API_URL } from '../app.constants';
import { environment } from '../../environments/environment';

export const AUTHTOKEN = 'authToken'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService implements CanActivate {

  constructor(private router: Router,
    private httpService: HttpClient){}

  createAuthHTTPHeader(){
    let username = "Achin";
    let password = "dummy";

    let header = "Basic " + window.btoa(username + ":" + password);

    return header;
  }

  executeBasicAuthService(username: string, password: string) {
    // console.log("Hello World Bean Called")

    let header = "Basic " + window.btoa(username + ":" + password);

    let authHeader = new HttpHeaders ({
      Authorization: header});

    return this.httpService.get<BasicAuthBean>(
      //`${API_URL}/basicauth/${username}`,
      `${environment.backend.API_URL}/basicauth/${username}`,
      {headers: authHeader}).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(AUTHTOKEN, header);
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

export class BasicAuthBean {

  constructor (private message: String){}

}
