import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _url = "https://bugpredator.herokuapp.com/";
  // private _url = 'http://localhost:9000/';

  constructor(private http:HttpClient) { }

  cartData=[
    {'id':1231,'title':'1 year subscription','price':2000,'image':'https://iclass.eccouncil.org/wp-content/uploads/2019/05/AllAccess-324x324.jpg','status':false},
    {'id':1412,'title':'2 year subscription','price':3000,'image':'https://iclass.eccouncil.org/wp-content/uploads/2019/05/VAPT-324x324.jpg','status':false},
    {'id':1312,'title':'3 year subscription','price':4000,'image':'https://iclass.eccouncil.org/wp-content/uploads/2019/05/VAPT-324x324.jpg','status':false},
  ];

  addToCart(id){
    this.cartData.forEach((item)=>{
      if(item['id']==id)
        item['status']=true;
    })
  }

  removeFromCart(id){
    this.cartData.forEach((item)=>{
      if(item['id']==id)
        item['status']=false;
    })
  }

  getCart(){
    return this.cartData;
  }

  checkout(data){
    return this.http.post<any>(this._url+'cart',data);
  }

  save(data){
    return this.http.post(this._url+'message',data);
  }
  getMessage(){
    return this.http.get(this._url+'message');
  }
  getProducts(){
    return this.http.get(this._url+'cart');
  }
  resendKey(id){
    return this.http.get(this._url+'cart/'+id);
  }
}
