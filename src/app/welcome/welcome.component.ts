import { HelloServiceResponse, WelcomeService } from './../service/data/welcome.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = ''
  customisedMessage: String = ''

  constructor(private route: ActivatedRoute,
      private welcomeService: WelcomeService) {
    this.name = this.route.snapshot.params['name']
   }

  ngOnInit() {
  }

  getWelcomeMsg(){
    //console.log(this.welcomeService.executeHelloWorldBeanService());
    this.welcomeService.executeHelloWorldBeanServiceWithPath(this.name).subscribe(
      response => this.handleSuccessfulResponse (response),
      error => this.handleErrorResponse(error)
    );
  }

  handleSuccessfulResponse(response: HelloServiceResponse){
    //console.log(response.message);
    this.customisedMessage = response.message;
  }

  handleErrorResponse(error: { error: { message: String; }; }){
    this.customisedMessage = error.error.message;
  }
}
