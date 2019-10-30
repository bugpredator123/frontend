import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { DownloadPageComponent } from './download-page/download-page.component';
import { BuyPageComponent } from './buy-page/buy-page.component';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from '../app/services/token-interceptor.service';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ThankPageComponent } from './thank-page/thank-page.component';
import { AdminComponent } from './admin/admin.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { ProductsComponent } from './admin/products/products.component';
import { MessagesComponent } from './admin/messages/messages.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    FooterComponent,
    DownloadPageComponent,
    BuyPageComponent,
    CartComponent,
    AuthComponent,
    ThankPageComponent,
    AdminComponent,
    AdminNavbarComponent,
    ProductsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard,AuthService,CookieService,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
