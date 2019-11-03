import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.tooltipped').tooltip({delay:0});
    });
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
