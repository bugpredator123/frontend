import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DownloadPageComponent } from './download-page/download-page.component';
import { BuyPageComponent } from './buy-page/buy-page.component';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth.guard';
import { ThankPageComponent } from './thank-page/thank-page.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './admin/products/products.component';
import { MessagesComponent } from './admin/messages/messages.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'download',component:DownloadPageComponent},
  {path:'buy',component:BuyPageComponent,canActivate:[AuthGuard]},
  {path:'checkout',component:CartComponent,canActivate:[AuthGuard]},
  {path:'auth',component:AuthComponent},
  {path:'thanks-page',component:ThankPageComponent,},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard],children:[
    {path:'products',component:ProductsComponent},
    {path:'messages',component:MessagesComponent},
    {path:'**',redirectTo:'/admin/products',pathMatch:'full'},
  ]},
  {path:'**',redirectTo:'/home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
