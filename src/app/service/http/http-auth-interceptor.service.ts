import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthService } from '../basic-auth.service';
import { JWTAuthService } from '../jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthInterceptorService implements HttpInterceptor{

  // constructor(private basicAuthService: BasicAuthService) { }
  constructor(private jwtAuthService: JWTAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // let username = "Achin";
    // let password = "dummy";

    //let header = "Basic " + window.btoa(username + ":" + password);

    // let authHeader = this.basicAuthService.getAuthToken();
    // let user = this.basicAuthService.getLoggedUser();

    let authHeader = this.jwtAuthService.getAuthToken();
    let user = this.jwtAuthService.getLoggedUser();

    if(authHeader && user){
      req = req.clone({
        setHeaders: {
          Authorization: authHeader
        }
      })
    }

    return next.handle(req);
  }
}
