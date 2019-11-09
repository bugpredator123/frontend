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
    let cartData = JSON.parse(window.localStorage.getItem('cart'));
    if (cartData && cartData.length > 0) {
      let indexes = cartData.filter((item) => item.status == true).map((item) => item.id);
      this.data.forEach((item) => {
        if (indexes.includes(item.id))
          item.status = true;
      });
    }
    this.data.forEach((item) => {
      if (item['status']) {
        this.count++;
        this.total += item['price'];
      }
    });
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
    let formData = JSON.parse(window.localStorage.getItem('checkoutForm'));
    if(formData)
      this.checkoutForm.patchValue(formData);
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

  saveChanges() {
    let data = this.checkoutForm.value;
    //clearing expiry month,year and cvv
    data['exp_month'] = null;
    data['exp_year'] = null;
    data['cvv'] = null;
    //storing in localstorage
    window.localStorage.setItem('checkoutForm', JSON.stringify(data));
  }

  removeMe(index){
    this.data[index]['status']=false;
    this.count = 0;
    this.total = 0;
    this.data.forEach((item) => {
      if (item['status']) {
        this.count++;
        this.total += item['price'];
      }
    });
    window.localStorage.setItem('cart', JSON.stringify(this.data));
  }
}
