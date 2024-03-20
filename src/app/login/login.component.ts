import { SimpleAuthService } from './../service/simple-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthService } from '../service/basic-auth.service';
import { JWTAuthService } from '../service/jwt-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'Achin'
  password = ''
  invalidLogin = false

  constructor(private router:Router,
    private authService: SimpleAuthService,
    private basicAuthService: BasicAuthService,
    private jwtAuthService: JWTAuthService) { }

  ngOnInit() {
  }

  handleLogin() {
    // console.log(this.username)
    // if (this.username === 'Achin' && this.password === 'dummy'){
    if (this.authService.authenticate(this.username, this.password)){
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
  }

  handleBasicAuthLogin() {

    this.basicAuthService.executeBasicAuthService(this.username, this.password)
    .subscribe (
      data => {
        this.router.navigate(['welcome', this.username])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
      }
    )
   }

   handleJWTAuthLogin() {

    this.jwtAuthService.executeJWTAuthService(this.username, this.password)
    .subscribe (
      data => {
        this.router.navigate(['welcome', this.username])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
      }
    )
   }
}
