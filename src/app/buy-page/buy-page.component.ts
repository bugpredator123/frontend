import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css']
})
export class BuyPageComponent implements OnInit {
  data = [];

  constructor(private dataService: DataService) {
    this.data = this.dataService.getCart();
    let cartData = JSON.parse(window.localStorage.getItem('cart'));
    if ( cartData && cartData.length > 0) {
      let indexes = cartData.filter((item) => item.status == true).map((item) => item.id);
      this.data.forEach((item) => {
        if (indexes.includes(item.id))
          item.status = true;
      });
    }
  }

  ngOnInit() {
  }

  addToCart(id) {
    this.dataService.addToCart(id);
    this.data = this.dataService.getCart();
    window.localStorage.setItem('cart', JSON.stringify(this.data));
  }
}
