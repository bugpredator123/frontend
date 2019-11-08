import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  formActive: boolean = false;
  signupForm: FormGroup;
  loginForm: FormGroup;
  loading = false;

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    //signupform
    this.signupForm = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required]],
      'confirm': [null, [Validators.required, this.validatePassword]]
    }, { validators: this.validatePassword('password', 'confirm') });

    // login Form
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
    });
  }

  toggleForm() {
    this.formActive = !this.formActive;
  }
  registerUser() {
    this.loading = true;
    this.authService.registerUser(this.signupForm.value).subscribe(
      (response) => {
        this.authService.setToken(response['token']);
        this.router.navigate(['/buy']);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        alert(error.error);
        this.signupForm.reset();
        console.log(error);
      }
    );
  }

  loginUser() {
    this.loading = true;
    this.authService.loginUser(this.loginForm.value).subscribe(
      (response) => {
        response = response['data'];
        this.authService.setToken(response['token']);
        if (response['admin']) {
          this.cookieService.set('admin', 'true');
          this.router.navigate(['/admin']);
          this.loading = false;
        }
        else {
          this.router.navigate(['/buy']);
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
        this.loginForm.reset();
        alert("Wrong email or password. Try Again");
        console.log(error);
      }
    );
  }

  validatePassword(pass1, pass2) {
    return (formGroup: FormGroup) => {
      let password = formGroup.controls[pass1].value;
      let confirm = formGroup.controls[pass2].value;
      if (password != confirm ) {
        return { mustMatch: true };
      } else {
        return null;
      }
    }
  }

}
