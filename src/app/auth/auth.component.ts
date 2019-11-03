import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  formActive:boolean=false;
  signupForm:FormGroup;
  loginForm:FormGroup;
  loading=false;
  constructor(private authService:AuthService,private router:Router,private cookieService:CookieService) { }

  ngOnInit() {
    //signupform
    this.signupForm = new FormGroup({
      'email':new FormControl(null),
      'password':new FormControl(null)
    });

    // login Form
    this.loginForm = new FormGroup({
      'email':new FormControl(null),
      'password':new FormControl(null)
    });
  }

  toggleForm(){
    this.formActive = !this.formActive;
  }
  registerUser(){
    this.loading = true;
    this.authService.registerUser(this.signupForm.value).subscribe(
      (response)=>{
        this.authService.setToken(response['token']);
        this.router.navigate(['/buy']);
        this.loading=false;
      },
      (error)=>{
        this.loading=false;
        console.log(error);
      }
    );
  }

  loginUser(){
    this.loading=true;
    this.authService.loginUser(this.loginForm.value).subscribe(
      (response)=>{
        response = response['data'];
        this.authService.setToken(response['token']);
        if(response['admin']){
          this.cookieService.set('admin','true');
          this.router.navigate(['/admin']);
          this.loading=false;
        }
        else{
          this.router.navigate(['/buy']);
          this.loading=false;
        }
      },
      (error)=>{
        this.loading=false;
        console.log(error);
      }
    );
  }
}
