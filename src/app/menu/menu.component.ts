import { Component, OnInit } from '@angular/core';
import { SimpleAuthService } from '../service/simple-auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public authService: SimpleAuthService) { }

  ngOnInit() {
  }

}
