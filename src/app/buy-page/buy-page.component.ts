import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css']
})
export class BuyPageComponent implements OnInit {
  data=[];

  constructor(private dataService:DataService) { 
    this.data=this.dataService.getCart();
    console.log(this.data);
  }

  ngOnInit() {
  }

  addToCart(id){
    this.dataService.addToCart(id);
    this.data=this.dataService.getCart();
  }
}
