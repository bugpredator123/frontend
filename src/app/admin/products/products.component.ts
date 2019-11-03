import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products=null;
  sending=false;
  loading=true;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getProducts().subscribe(
      (res)=>{
        this.loading=false;
        this.products=res;
        console.log(res);
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  ngAfterViewInit(){
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }

  resendKey(id){
    this.sending=true;
    this.dataService.resendKey(id).subscribe(
      (res)=>{
        this.sending=false;
        alert("Key Sent");
      },
      (error)=>{
        this.sending = false;
        console.log(error);
      });
  }
}
