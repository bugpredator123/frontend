import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private cookieService:CookieService,private router:Router) { }

  ngOnInit() {
    let token = this.cookieService.get('admin');
    console.log(token)
  }

}
