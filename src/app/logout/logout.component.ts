import { Component, OnInit } from '@angular/core';
import { SimpleAuthService } from '../service/simple-auth.service';
import { BasicAuthService } from '../service/basic-auth.service';
import { JWTAuthService } from '../service/jwt-auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: SimpleAuthService,
    private basicAuthService: BasicAuthService,
    private jwtAuthService: JWTAuthService) { }

  ngOnInit() {
    // this.authService.logout();
    // this.basicAuthService.logout();
    this.jwtAuthService.logout();
  }

}
