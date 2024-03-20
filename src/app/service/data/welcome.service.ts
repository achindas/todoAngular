import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

export class HelloServiceResponse {

  constructor(
    public message: String
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(
    private helloService:HttpClient
    ) { }

  createAuthHTTPHeader(){
    let username = "Achin";
    let password = "dummy";

    let header = "Basic " + window.btoa(username + ":" + password);

    return header;
  }

  executeHelloWorldBeanService() {
    // console.log("Hello World Bean Called")
    return this.helloService.get<HelloServiceResponse>('${API_URL}/hello-world-bean/Achin');
  }

  executeHelloWorldBeanServiceWithPath(name: String) {
    // console.log("Hello World Bean Called")

    // let authHeader = new HttpHeaders ({
    //   Authorization: this.createAuthHTTPHeader()});

    // return this.helloService.get<HelloServiceResponse>(
    //   `${API_URL}/hello-world-bean/${name}`,
    //   {headers: authHeader}
    //   );

    return this.helloService.get<HelloServiceResponse>(
      `${API_URL}/hello-world-bean/${name}`);

  }
}
