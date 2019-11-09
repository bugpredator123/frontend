import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = "https://bugpredator.herokuapp.com/";
  // private API = "http://127.0.0.1:9000/";

  private _registerUrl = this.API + 'auth/register';
  private    _loginUrl = this.API + 'auth/login';

  constructor(private http: HttpClient, public cookie:CookieService,public router:Router) { }

  registerUser(data) {
    return this.http.post<any>(this._registerUrl, {'email':data['email'],'password':data['password']});
  }

  loginUser(data) {
    return this.http.post<any>(this._loginUrl, {'email':data['email'],'password':data['password']});
  }

  loggedIn() {
    return !!this.cookie.get('token');
  }
  setToken(token){
    this.cookie.set('token',token);
  }
  getToken(){
    return this.cookie.get('token');
  }

  logout(){
    this.cookie.deleteAll();
  }
}
