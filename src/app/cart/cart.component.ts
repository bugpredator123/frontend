import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  data = [];
  count = 0;
  total = 0;
  checkoutForm: FormGroup;
  constructor(private dataService: DataService, private router: Router) {
    this.data = this.dataService.getCart();
    this.data.forEach((item) => {
      if (item['status']) {
        this.count++;
        this.total += item['price'];
      }
    })
  }

  ngOnInit() {
    this.checkoutForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'mac': new FormControl(null, [Validators.required,]),
      'name_on_card': new FormControl(null, [Validators.required]),
      'card_number': new FormControl(null, [Validators.required]),
      'expiry_month': new FormControl(null, [Validators.required]),
      'expiry_year': new FormControl(null, [Validators.required]),
      'cvv': new FormControl(null, [Validators.required])
    });
  }

  checkout() {
    if (this.total > 0) {
      let data = {};
      data['details'] = this.checkoutForm.value;
      data['products'] = [];
      this.data.forEach(
        (product) => {
          if (product.status)
            data['products'].push(product);
        });
      this.dataService.checkout(data).subscribe(
        (res) => {
          this.router.navigate(['/thanks-page']);
        },
        (error) => console.log(error)
      );
    }
  }
}
