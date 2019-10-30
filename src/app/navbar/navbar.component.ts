import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:Boolean=false;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn();
    console.log(this.isLoggedIn);
  }
  ngDoCheck(){
    if(this.authService.loggedIn()!=this.isLoggedIn)
      this.isLoggedIn=this.authService.loggedIn();
  }
  
  logout(){
    this.authService.logout();
    this.isLoggedIn=false;
    this.router.navigate(['/home']);
  }
}
